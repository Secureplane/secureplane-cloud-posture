import axios, { AxiosInstance } from 'axios';
import { Logger } from '../utils/Logger';
import { WizConfig } from '../types/Config';

export class WizClient {
  private client: AxiosInstance;
  private logger: Logger;

  constructor(config: WizConfig) {
    this.logger = new Logger('WizClient');
    
    this.client = axios.create({
      baseURL: config.apiEndpoint,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async scanResource(resourceId: string): Promise<any> {
    try {
      const response = await this.client.post('/api/v1/scan', { resourceId });
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to scan resource ${resourceId}: ${error.message}`);
      throw error;
    }
  }

  async getVulnerabilities(resourceId: string): Promise<any> {
    try {
      const response = await this.client.get(`/api/v1/vulnerabilities/${resourceId}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get vulnerabilities for ${resourceId}: ${error.message}`);
      throw error;
    }
  }
}