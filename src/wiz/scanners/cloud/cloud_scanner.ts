import { BaseScanner } from '../../core/base_scanner';
import { ScannerConfig, ScanResult } from '../../types';
import { WizApiClient } from '../../api/client';

export class CloudScanner extends BaseScanner {
  private apiClient: WizApiClient;

  constructor(config: ScannerConfig) {
    super(config);
    this.apiClient = new WizApiClient(
      process.env.WIZ_API_KEY || '',
      process.env.WIZ_API_SECRET || ''
    );
  }

  async scan(): Promise<ScanResult> {
    await this.validateConfiguration();
    
    const startTime = Date.now();
    const results = await this.scanCloudResources();
    
    return {
      timestamp: new Date(),
      scanner: 'CloudScanner',
      vulnerabilities: results.vulnerabilities,
      compliance: results.compliance,
      metadata: {
        duration: Date.now() - startTime,
        resourcesScanned: results.resourceCount
      }
    };
  }

  private async scanCloudResources() {
    const resources = await this.apiClient.getCloudResources();
    const scanPromises = resources.map(resource => 
      this.apiClient.scanResource(resource.id)
    );
    
    const scanResults = await Promise.all(scanPromises);
    
    return {
      vulnerabilities: this.aggregateVulnerabilities(scanResults),
      compliance: this.aggregateCompliance(scanResults),
      resourceCount: resources.length
    };
  }

  private aggregateVulnerabilities(results: any[]) {
    return results.flatMap(result => result.vulnerabilities || []);
  }

  private aggregateCompliance(results: any[]) {
    const violations = results.flatMap(result => result.compliance?.violations || []);
    return {
      status: violations.length === 0 ? 'COMPLIANT' : 'NON_COMPLIANT',
      violations
    };
  }
}