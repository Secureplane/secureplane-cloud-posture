import { LoggerService } from '../../../config/services/LoggerService';
import { ContainerImage, ComplianceResult } from '../types/ContainerTypes';
import { WizApiClient } from '../../../api/client';

export class ComplianceAnalyzer {
  private logger: LoggerService;
  private apiClient: WizApiClient;

  constructor(apiClient: WizApiClient) {
    this.logger = new LoggerService('ComplianceAnalyzer');
    this.apiClient = apiClient;
  }

  async analyze(image: ContainerImage): Promise<ComplianceResult[]> {
    this.logger.info(`Analyzing container compliance: ${image.name}:${image.tag}`);
    
    try {
      const scanResponse = await this.apiClient.scanResource({
        resourceId: `${image.name}:${image.tag}`,
        scanType: 'container',
        options: {
          includeCompliance: true,
          frameworks: ['CIS', 'PCI-DSS', 'HIPAA']
        }
      });

      return this.parseComplianceResults(scanResponse);
    } catch (error) {
      this.logger.error(`Compliance analysis failed: ${error.message}`);
      throw error;
    }
  }

  private parseComplianceResults(results: any): ComplianceResult[] {
    return results.findings
      .filter(finding => finding.type === 'compliance')
      .map(finding => ({
        standard: finding.framework,
        control: finding.control,
        status: this.mapComplianceStatus(finding.status),
        description: finding.description
      }));
  }

  private mapComplianceStatus(status: string): 'PASS' | 'FAIL' | 'WARN' {
    switch (status.toUpperCase()) {
      case 'PASS':
      case 'COMPLIANT':
        return 'PASS';
      case 'FAIL':
      case 'NON_COMPLIANT':
        return 'FAIL';
      default:
        return 'WARN';
    }
  }
}