import { Logger } from '../utils/Logger';
import { WizConfig, ScannerConfig, MonitoringConfig } from '../types/Config';
import { readFileSync } from 'fs';
import { parse } from 'yaml';

export class ConfigService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('ConfigService');
  }

  async loadConfig(): Promise<{
    wiz: WizConfig;
    scanner: ScannerConfig;
    monitoring: MonitoringConfig;
  }> {
    try {
      const configFile = readFileSync('config/config.yaml', 'utf8');
      const config = parse(configFile);

      this.validateConfig(config);

      return config;
    } catch (error) {
      this.logger.error(`Failed to load configuration: ${error.message}`);
      throw error;
    }
  }

  private validateConfig(config: any): void {
    if (!config.wiz?.apiEndpoint || !config.wiz?.apiKey) {
      throw new Error('Missing required Wiz configuration');
    }
  }
}