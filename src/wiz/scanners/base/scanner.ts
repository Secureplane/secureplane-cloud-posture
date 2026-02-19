import { Logger } from '../../utils/logger';
import { WizApiClient } from '../../api/client';
import { ScanRequest, ScanResponse } from '../../api/types';

export abstract class BaseScanner {
  protected client: WizApiClient;
  protected logger: Logger;

  constructor(client: WizApiClient) {
    this.client = client;
    this.logger = new Logger();
  }

  abstract scan(resourceId: string): Promise<ScanResponse>;

  protected async executeScan(request: ScanRequest): Promise<ScanResponse> {
    this.logger.info(`Starting scan for resource ${request.resourceId}`);
    try {
      const response = await this.client.scanResource(request);
      this.logger.info(`Scan completed for resource ${request.resourceId}`);
      return response;
    } catch (error) {
      this.logger.error(`Scan failed: ${error}`);
      throw error;
    }
  }
}