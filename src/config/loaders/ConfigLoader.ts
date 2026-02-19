import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { WizConfig } from '../types/ConfigTypes';
import { validateConfig } from '../validators/ConfigValidator';
import { ConfigError } from '../errors/ConfigError';
import { EnvLoader } from './EnvLoader';
import { defaultConfig } from '../defaults/DefaultConfig';

export class ConfigLoader {
  private config: WizConfig | null = null;

  loadConfig(path: string): WizConfig {
    try {
      const fileContent = readFileSync(path, 'utf8');
      const parsedConfig = parse(fileContent) as WizConfig;
      const mergedConfig = this.mergeConfigs(parsedConfig);

      if (!validateConfig(mergedConfig)) {
        throw new ConfigError('Invalid configuration');
      }

      this.config = mergedConfig;
      return this.config;
    } catch (error) {
      throw new ConfigError(`Failed to load config: ${error.message}`);
    }
  }

  private mergeConfigs(fileConfig: WizConfig): WizConfig {
    const envApiConfig = {
      ...EnvLoader.loadEndpointConfig(),
      credentials: EnvLoader.loadApiCredentials()
    };

    return {
      ...defaultConfig,
      ...fileConfig,
      api: {
        ...defaultConfig.api,
        ...fileConfig.api,
        ...envApiConfig,
        credentials: {
          ...defaultConfig.api.credentials,
          ...fileConfig.api.credentials,
          ...envApiConfig.credentials
        }
      }
    };
  }

  getConfig(): WizConfig {
    if (!this.config) {
      throw new ConfigError('Configuration not loaded');
    }
    return this.config;
  }
}