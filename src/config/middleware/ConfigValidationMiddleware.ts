import { WizConfig } from '../types/ConfigTypes';
import { ConfigError } from '../errors/ConfigError';
import { LoggerService } from '../services/LoggerService';

export class ConfigValidationMiddleware {
  private logger: LoggerService;

  constructor() {
    this.logger = new LoggerService('ConfigValidation');
  }

  async validate(config: WizConfig): Promise<void> {
    try {
      await this.validateApiConfig(config.api);
      await this.validateScanningConfig(config.scanning);
      await this.validateSecurityConfig(config.security);
      this.logger.info('Configuration validation successful');
    } catch (error) {
      this.logger.error(`Configuration validation failed: ${error.message}`);
      throw new ConfigError(`Validation failed: ${error.message}`);
    }
  }

  private async validateApiConfig(apiConfig: WizConfig['api']): Promise<void> {
    if (!apiConfig.endpoint || !apiConfig.credentials.apiKey || !apiConfig.credentials.apiSecret) {
      throw new ConfigError('Missing required API configuration');
    }
  }

  private async validateScanningConfig(scanningConfig: WizConfig['scanning']): Promise<void> {
    if (scanningConfig.interval < 300) {
      throw new ConfigError('Scanning interval must be at least 300 seconds');
    }
  }

  private async validateSecurityConfig(securityConfig: WizConfig['security']): Promise<void> {
    const validSeverities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    if (!validSeverities.includes(securityConfig.minSeverity)) {
      throw new ConfigError('Invalid security severity level');
    }
  }
}