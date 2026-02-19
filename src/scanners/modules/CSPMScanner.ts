import { Logger } from '../../utils/Logger';
import { WizClient } from '../../clients/WizClient';
import { ScanResult } from '../../types/Scanning';

export class CSPMScanner {
  private logger: Logger;
  private wizClient: WizClient;

  constructor(wizClient: WizClient) {
    this.logger = new Logger('CSPMScanner');
    this.wizClient = wizClient;
  }

  async scan(): Promise<ScanResult> {
    try {
      this.logger.info('Starting CSPM scan');
      
      const [
        configResults,
        complianceResults,
        riskResults
      ] = await Promise.all([
        this.scanCloudConfiguration(),
        this.checkCompliance(),
        this.assessRisks()
      ]);

      return {
        timestamp: new Date(),
        type: 'cspm',
        findings: [
          ...configResults,
          ...complianceResults,
          ...riskResults
        ],
        metadata: {
          scanDuration: 0,
          resourcesScanned: 0
        }
      };
    } catch (error) {
      this.logger.error(`CSPM scan failed: ${error.message}`);
      throw error;
    }
  }

  private async scanCloudConfiguration(): Promise<any[]> {
    this.logger.info('Scanning cloud configuration');
    const response = await this.wizClient.scanResource('cloud-config');
    return response.findings || [];
  }

  private async checkCompliance(): Promise<any[]> {
    this.logger.info('Checking compliance');
    const response = await this.wizClient.scanResource('compliance');
    return response.findings || [];
  }

  private async assessRisks(): Promise<any[]> {
    this.logger.info('Assessing risks');
    const response = await this.wizClient.scanResource('risks');
    return response.findings || [];
  }
}