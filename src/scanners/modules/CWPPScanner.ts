import { Logger } from '../../utils/Logger';
import { WizClient } from '../../clients/WizClient';
import { ScanResult } from '../../types/Scanning';

export class CWPPScanner {
  private logger: Logger;
  private wizClient: WizClient;

  constructor(wizClient: WizClient) {
    this.logger = new Logger('CWPPScanner');
    this.wizClient = wizClient;
  }

  async scan(): Promise<ScanResult> {
    try {
      this.logger.info('Starting CWPP scan');
      
      const [
        containerResults,
        workloadResults,
        runtimeResults
      ] = await Promise.all([
        this.scanContainers(),
        this.scanWorkloads(),
        this.monitorRuntime()
      ]);

      return {
        timestamp: new Date(),
        type: 'cwpp',
        findings: [
          ...containerResults,
          ...workloadResults,
          ...runtimeResults
        ],
        metadata: {
          scanDuration: 0,
          resourcesScanned: 0
        }
      };
    } catch (error) {
      this.logger.error(`CWPP scan failed: ${error.message}`);
      throw error;
    }
  }

  private async scanContainers(): Promise<any[]> {
    this.logger.info('Scanning containers');
    const response = await this.wizClient.scanResource('containers');
    return response.findings || [];
  }

  private async scanWorkloads(): Promise<any[]> {
    this.logger.info('Scanning workloads');
    const response = await this.wizClient.scanResource('workloads');
    return response.findings || [];
  }

  private async monitorRuntime(): Promise<any[]> {
    this.logger.info('Monitoring runtime');
    const response = await this.wizClient.scanResource('runtime');
    return response.findings || [];
  }
}