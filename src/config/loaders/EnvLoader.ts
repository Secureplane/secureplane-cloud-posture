import { ApiConfig } from '../types/ConfigTypes';

export class EnvLoader {
  static loadApiCredentials(): Partial<ApiConfig['credentials']> {
    return {
      apiKey: process.env.WIZ_API_KEY,
      apiSecret: process.env.WIZ_API_SECRET
    };
  }

  static loadEndpointConfig(): Partial<ApiConfig> {
    return {
      endpoint: process.env.WIZ_API_ENDPOINT,
      timeout: process.env.WIZ_API_TIMEOUT ? parseInt(process.env.WIZ_API_TIMEOUT) : undefined,
      retries: process.env.WIZ_API_RETRIES ? parseInt(process.env.WIZ_API_RETRIES) : undefined
    };
  }
}