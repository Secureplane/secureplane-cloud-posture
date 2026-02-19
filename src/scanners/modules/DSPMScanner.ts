import { Logger } from '../../utils/Logger';
import { WizClient } from '../../clients/WizClient';
import { ScanResult } from '../../types/Scanning';

export class DSPMScanner {
  private logger: Logger;
  private wizClient: WizClient;

  constructor(wizClient: WizClient) {
    this.logger = new Logger('DSPMScanner');
    this.wizClient = wizClient;
  }

  async scan(): Promise<ScanResult> {
    try {
      this.logger.info('Starting DSPM scan');
      
      const [
        datastoreResults,
        accessResults,
        dataflowResults
      ] = await Promise.all([
        this.scanDataStores(),
        this.checkDataAccess(),
        this.monitorDataFlow()
      ]);

      return {
        timestamp: new Date(),
        type: 'dspm',
        findings: [
          ...datastoreResults,
          ...accessResults,
          ...dataflowResults
        ],
        metadata: {
          scanDuration: 0,
          resourcesScanned: 0
        }
      };
    } catch (error) {
      this.logger.error(`DSPM scan failed: ${error.message}`);
      throw error;
    }
  }

  private async scanDataStores(): Promise<any[]> {
    this.logger.info('Scanning data stores');
    const response = await this.wizClient.scanResource('datastores');
    return response.findings || [];
  }

  private async checkDataAccess(): Promise<any[]> {
    this.logger.info('Checking data access');
    const response = await this.wizClient.scanResource('data-access');
    return response.findings || [];
  }

  private async monitorDataFlow(): Promise<any[]> {
    this.logger.info('Monitoring data flow');
    const response = await this.wizClient.scanResource('data-flow');
    return response.findings || [];
  }
}