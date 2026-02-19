import axios from 'axios';
import { Logger } from '../../utils/logger';

export class CloudApiClient {
  private logger: Logger;
  private apiKey: string;
  private apiSecret: string;

  constructor(apiKey: string, apiSecret: string) {
    this.logger = new Logger();
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  async scanResource(resourceId: string): Promise<any> {
    try {
      const response = await axios.post('/api/scan', {
        resourceId,
        credentials: {
          apiKey: this.apiKey,
          apiSecret: this.apiSecret
        }
      });
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to scan resource ${resourceId}: ${error}`);
      throw error;
    }
  }

  async getVulnerabilities(resourceId: string): Promise<any> {
    try {
      const response = await axios.get(`/api/vulnerabilities/${resourceId}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get vulnerabilities for ${resourceId}: ${error}`);
      throw error;
    }
  }
}