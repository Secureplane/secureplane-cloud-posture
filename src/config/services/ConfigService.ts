import { IConfigService } from '../interfaces/IConfigService';
import { WizConfig } from '../types/ConfigTypes';
import { ConfigLoader } from '../loaders/ConfigLoader';
import { ConfigCache } from '../cache/ConfigCache';
import { LoggerService } from '../services/LoggerService';
import { ConfigError } from '../errors/ConfigError';

export class ConfigService implements IConfigService {
  private configLoader: ConfigLoader;
  private configCache: ConfigCache;
  private logger: LoggerService;

  constructor() {
    this.configLoader = new ConfigLoader();
    this.configCache = new ConfigCache();
    this.logger = new LoggerService();
  }

  async loadConfig(path: string): Promise<WizConfig> {
    try {
      const cachedConfig = this.configCache.get();
      if (cachedConfig) {
        this.logger.info('Using cached configuration');
        return cachedConfig;
      }

      const config = await this.configLoader.loadConfig(path);
      this.configCache.set(config);
      this.logger.info('Configuration loaded successfully');
      return config;
    } catch (error) {
      this.logger.error(`Failed to load configuration: ${error.message}`);
      throw new ConfigError(`Configuration loading failed: ${error.message}`);
    }
  }

  getConfig(): WizConfig {
    const config = this.configCache.get();
    if (!config) {
      throw new ConfigError('Configuration not loaded');
    }
    return config;
  }

  async reloadConfig(): Promise<WizConfig> {
    this.configCache.clear();
    return this.loadConfig(this.configLoader.getConfigPath());
  }

  async validateConfig(config: WizConfig): Promise<boolean> {
    try {
      const isValid = await this.configLoader.validateConfig(config);
      if (!isValid) {
        this.logger.error('Configuration validation failed');
        return false;
      }
      return true;
    } catch (error) {
      this.logger.error(`Configuration validation error: ${error.message}`);
      return false;
    }
  }
}