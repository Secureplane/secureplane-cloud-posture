import { WizConfig } from '../types/ConfigTypes';

export class ConfigUtils {
  static interpolateEnvVars(value: string): string {
    return value.replace(/\${([^}]+)}/g, (_, key) => process.env[key] || '');
  }

  static sanitizeConfig(config: WizConfig): WizConfig {
    return {
      ...config,
      api: {
        ...config.api,
        credentials: {
          apiKey: '***',
          apiSecret: '***'
        }
      }
    };
  }

  static validateRequiredEnvVars(): void {
    const required = ['WIZ_API_KEY', 'WIZ_API_SECRET'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
}