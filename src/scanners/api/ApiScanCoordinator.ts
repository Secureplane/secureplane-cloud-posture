import { Logger } from '../../utils/Logger';
import { AuthScanner } from './scanners/AuthScanner';
import { ValidationScanner } from './scanners/ValidationScanner';
import { SecurityHeaderScanner } from './scanners/SecurityHeaderScanner';
import { ApiScanConfig } from './types/ApiScanConfig';

export class ApiScanCoordinator {
  private logger: Logger;
  private authScanner: AuthScanner;
  private validationScanner: ValidationScanner;
  private headerScanner: SecurityHeaderScanner;

  constructor(private config: ApiScanConfig) {
    this.logger = new Logger('ApiScanCoordinator');
    this.authScanner = new AuthScanner();
    this.validationScanner = new ValidationScanner();
    this.headerScanner = new SecurityHeaderScanner();
  }

  async scanApi(apiSpec: string) {
    try {
      const [authResults, validationResults, headerResults] = await Promise.all([
        this.authScanner.scan(apiSpec, this.config.auth),
        this.validationScanner.scan(apiSpec, this.config.validation),
        this.headerScanner.scan(apiSpec, this.config.headers)
      ]);

      return {
        auth: authResults,
        validation: validationResults,
        headers: headerResults,
        metadata: {
          timestamp: new Date(),
          apiSpec
        }
      };
    } catch (error) {
      this.logger.error(`API scan failed: ${error.message}`);
      throw error;
    }
  }
}