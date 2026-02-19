import { Logger } from '../utils/Logger';
import { WizClient } from '../clients/WizClient';
import { CSPMScanner } from './modules/CSPMScanner';
import { CWPPScanner } from './modules/CWPPScanner';
import { DSPMScanner } from './modules/DSPMScanner';
import { ScanResult } from '../types/Scanning';

export class SecurityScanner {
  private logger: Logger;
  private cspmScanner: CSPMScanner;
  private cwppScanner: CWPPScanner;
  private dspmScanner: DSPMScanner;

  constructor(wizClient: WizClient) {
    this.logger = new Logger('SecurityScanner');
    this.cspmScanner = new CSPMScanner(wizClient);
    this.cwppScanner = new CWPPScanner(wizClient);
    this.dspmScanner = new DSPMScanner(wizClient);
  }

  async startScanning(): Promise<void> {
    try {
      this.logger.info('Starting comprehensive security scanning');
      
      const [
        cspmResults,
        cwppResults,
        dspmResults
      ] = await Promise.all([
        this.cspmScanner.scan(),
        this.cwppScanner.scan(),
        this.dspmScanner.scan()
      ]);

      await this.processResults([cspmResults, cwppResults, dspmResults]);
      
      this.logger.info('Security scanning completed');
    } catch (error) {
      this.logger.error(`Security scanning failed: ${error.message}`);
      throw error;
    }
  }

  private async processResults(results: ScanResult[]): Promise<void> {
    const totalFindings = results.reduce((sum, result) => sum + result.findings.length, 0);
    const criticalFindings = results.reduce((sum, result) => 
      sum + result.findings.filter(f => f.severity === 'CRITICAL').length, 0);

    this.logger.info(`Scan complete. Total findings: ${totalFindings}, Critical: ${criticalFindings}`);
  }
}