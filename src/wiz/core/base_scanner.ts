import { Logger } from '../utils/logger';
import { ScannerConfig, ScanResult } from '../types';

export abstract class BaseScanner {
  protected logger: Logger;
  protected config: ScannerConfig;
  protected scanInterval: number;

  constructor(config: ScannerConfig) {
    this.logger = new Logger();
    this.config = config;
    this.scanInterval = config.scanning?.interval || 3600;
  }

  abstract scan(): Promise<ScanResult>;

  protected async validateConfiguration(): Promise<boolean> {
    if (!this.config) {
      this.logger.error('Scanner configuration is missing');
      return false;
    }
    return true;
  }
}