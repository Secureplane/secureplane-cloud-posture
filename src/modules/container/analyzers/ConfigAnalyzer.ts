import { LoggerService } from '../../../config/services/LoggerService';
import { ContainerImage, ConfigIssue } from '../types/ContainerTypes';
import { WizApiClient } from '../../../api/client';

export class ConfigAnalyzer {
  private logger: LoggerService;
  private apiClient: WizApiClient;

  constructor(apiClient: WizApiClient) {
    this.logger = new LoggerService('ConfigAnalyzer');
    this.apiClient = apiClient;
  }

  async analyze(image: ContainerImage): Promise<ConfigIssue[]> {
    this.logger.info(`Analyzing container configuration: ${image.name}:${image.tag}`);
    
    try {
      const scanResponse = await this.apiClient.scanResource({
        resourceId: `${image.name}:${image.tag}`,
        scanType: 'container',
        options: {
          includeConfiguration: true
        }
      });

      return this.parseConfigIssues(scanResponse);
    } catch (error) {
      this.logger.error(`Configuration analysis failed: ${error.message}`);
      throw error;
    }
  }

  private parseConfigIssues(results: any): ConfigIssue[] {
    return results.findings
      .filter(finding => finding.type === 'configuration')
      .map(finding => ({
        type: this.mapIssueType(finding.category),
        severity: this.normalizeSeverity(finding.severity),
        description: finding.description,
        context: finding.context,
        remediation: finding.remediation
      }));
  }

  private mapIssueType(category: string): 'security' | 'best-practice' {
    return category.includes('security') ? 'security' : 'best-practice';
  }

  private normalizeSeverity(severity: string): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const normalized = severity.toUpperCase();
    return ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(normalized) 
      ? normalized as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
      : 'MEDIUM';
  }
}