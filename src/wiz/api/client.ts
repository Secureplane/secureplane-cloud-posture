import axios, { AxiosInstance } from 'axios';
import { ApiConfig, ScanRequest, ScanResponse } from './types';
import { Logger } from '../utils/logger';

export class WizApiClient {
  private client: AxiosInstance;
  private logger: Logger;

  constructor(config: ApiConfig) {
    this.logger = new Logger();
    this.client = axios.create({
      baseURL: config.endpoint,
      timeout: config.timeout,
      headers: {
        'Authorization': `Bearer ${this.generateAuthToken(config)}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async scanResource(request: ScanRequest): Promise<ScanResponse> {
    try {
      const response = await this.client.post('/api/v1/scan', request);
      return response.data;
    } catch (error) {
      this.logger.error(`Scan failed for resource ${request.resourceId}: ${error}`);
      throw error;
    }
  }

  async getFindings(scanId: string): Promise<Finding[]> {
    try {
      const response = await this.client.get(`/api/v1/findings/${scanId}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get findings for scan ${scanId}: ${error}`);
      throw error;
    }
  }

  private generateAuthToken(config: ApiConfig): string {
    // Implement token generation logic
    return '';
  }
}