import { LoggerService } from '../../../config/services/LoggerService';
import { ContainerScanResult, ContainerImage } from '../types/ContainerTypes';
import { WizVulnerabilityScanner } from '../scanners/WizVulnerabilityScanner';
import { ComplianceAnalyzer } from '../analyzers/ComplianceAnalyzer';
import { ConfigAnalyzer } from '../analyzers/ConfigAnalyzer';
import { WizApiClient } from '../../../api/client';

export class ContainerSecurityService {
  private logger: LoggerService;
  private vulnScanner: WizVulnerabilityScanner;
  private complianceAnalyzer: ComplianceAnalyzer;
  private configAnalyzer: ConfigAnalyzer;

  constructor(apiClient: WizApiClient) {
    this.logger = new LoggerService('ContainerSecurity');
    this.vulnScanner = new WizVulnerabilityScanner(apiClient);
    this.complianceAnalyzer = new ComplianceAnalyzer(apiClient);
    this.configAnalyzer = new ConfigAnalyzer(apiClient);
  }

  async scanContainer(image: ContainerImage): Promise<ContainerScanResult> {
    this.logger.info(`Starting container security scan for ${image.name}`);
    
    try {
      const startTime = Date.now();
      
      const [vulnerabilities, compliance, configIssues] = await Promise.all([
        this.vulnScanner.scan(image),
        this.complianceAnalyzer.analyze(image),
        this.configAnalyzer.analyze(image)
      ]);
      
      return {
        imageId: image.id,
        name: image.name,
        tag: image.tag,
        timestamp: new Date(),
        vulnerabilities,
        compliance,
        configIssues,
        metadata: {
          scanDuration: Date.now() - startTime,
          status: 'completed'
        }
      };
    } catch (error) {
      this.logger.error(`Container security scan failed: ${error.message}`);
      throw error;
    }
  }
}