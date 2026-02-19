import { BaseScanner } from '../../base/scanner';
import { ScanResponse, ApiConfig } from '../../types';
import { Logger } from '../../utils/logger';

export class ApiSecurityScanner extends BaseScanner {
  private logger: Logger;

  constructor(config: ApiConfig) {
    super(config);
    this.logger = new Logger();
  }

  async scan(apiEndpoint: string): Promise<ScanResponse> {
    return this.executeScan({
      resourceId: apiEndpoint,
      scanType: 'vulnerability',
      options: {
        scanTypes: [
          'authentication',
          'authorization',
          'data_validation',
          'rate_limiting',
          'security_headers'
        ],
        depth: 'full',
        includeSwagger: true
      }
    });
  }

  async analyzeApiSecurity(apiEndpoint: string): Promise<any> {
    try {
      const scanResult = await this.scan(apiEndpoint);
      return {
        authentication: this.analyzeAuthentication(scanResult),
        authorization: this.analyzeAuthorization(scanResult),
        dataValidation: this.analyzeDataValidation(scanResult),
        securityHeaders: this.analyzeSecurityHeaders(scanResult),
        rateLimiting: this.analyzeRateLimiting(scanResult)
      };
    } catch (error) {
      this.logger.error(`API security analysis failed: ${error}`);
      throw error;
    }
  }

  private analyzeAuthentication(scanResult: ScanResponse): any {
    return {
      methods: this.extractAuthMethods(scanResult),
      vulnerabilities: this.extractAuthVulnerabilities(scanResult),
      recommendations: this.generateAuthRecommendations(scanResult)
    };
  }

  private analyzeAuthorization(scanResult: ScanResponse): any {
    return {
      rbacConfig: this.extractRbacConfig(scanResult),
      permissions: this.extractPermissions(scanResult),
      vulnerabilities: this.extractAuthzVulnerabilities(scanResult)
    };
  }

  private analyzeDataValidation(scanResult: ScanResponse): any {
    return {
      inputValidation: this.checkInputValidation(scanResult),
      outputEncoding: this.checkOutputEncoding(scanResult),
      vulnerabilities: this.extractValidationVulnerabilities(scanResult)
    };
  }

  private analyzeSecurityHeaders(scanResult: ScanResponse): any {
    return {
      presentHeaders: this.checkPresentHeaders(scanResult),
      missingHeaders: this.checkMissingHeaders(scanResult),
      recommendations: this.generateHeaderRecommendations(scanResult)
    };
  }

  private analyzeRateLimiting(scanResult: ScanResponse): any {
    return {
      configured: this.checkRateLimitConfig(scanResult),
      effectiveness: this.analyzeRateLimitEffectiveness(scanResult),
      recommendations: this.generateRateLimitRecommendations(scanResult)
    };
  }

  private extractAuthMethods(scanResult: ScanResponse): string[] {
    return scanResult.findings
      .filter(finding => finding.type === 'authentication')
      .map(finding => finding.description);
  }

  private extractAuthVulnerabilities(scanResult: ScanResponse): any[] {
    return scanResult.findings
      .filter(finding => finding.type === 'authentication' && finding.severity === 'HIGH');
  }

  private generateAuthRecommendations(scanResult: ScanResponse): string[] {
    return scanResult.findings
      .filter(finding => finding.type === 'authentication')
      .map(finding => finding.remediation || '');
  }

  private extractRbacConfig(scanResult: ScanResponse): any {
    return scanResult.findings
      .filter(finding => finding.type === 'rbac')
      .map(finding => finding.description);
  }

  private extractPermissions(scanResult: ScanResponse): any[] {
    return scanResult.findings
      .filter(finding => finding.type === 'permission');
  }

  private extractAuthzVulnerabilities(scanResult: ScanResponse): any[] {
    return scanResult.findings
      .filter(finding => finding.type === 'authorization' && finding.severity === 'HIGH');
  }

  private checkInputValidation(scanResult: ScanResponse): any {
    return scanResult.findings
      .filter(finding => finding.type === 'input_validation');
  }

  private checkOutputEncoding(scanResult: ScanResponse): any {
    return scanResult.findings
      .filter(finding => finding.type === 'output_encoding');
  }

  private extractValidationVulnerabilities(scanResult: ScanResponse): any[] {
    return scanResult.findings
      .filter(finding => finding.type === 'validation' && finding.severity === 'HIGH');
  }

  private checkPresentHeaders(scanResult: ScanResponse): string[] {
    return scanResult.findings
      .filter(finding => finding.type === 'security_header' && finding.severity === 'LOW')
      .map(finding => finding.description);
  }

  private checkMissingHeaders(scanResult: ScanResponse): string[] {
    return scanResult.findings
      .filter(finding => finding.type === 'security_header' && finding.severity === 'HIGH')
      .map(finding => finding.description);
  }

  private generateHeaderRecommendations(scanResult: ScanResponse): string[] {
    return scanResult.findings
      .filter(finding => finding.type === 'security_header')
      .map(finding => finding.remediation || '');
  }

  private checkRateLimitConfig(scanResult: ScanResponse): boolean {
    return scanResult.findings
      .some(finding => finding.type === 'rate_limit' && finding.severity === 'LOW');
  }

  private analyzeRateLimitEffectiveness(scanResult: ScanResponse): any {
    return scanResult.findings
      .filter(finding => finding.type === 'rate_limit')
      .map(finding => ({
        endpoint: finding.description,
        effectiveness: finding.severity === 'LOW' ? 'effective' : 'insufficient'
      }));
  }

  private generateRateLimitRecommendations(scanResult: ScanResponse): string[] {
    return scanResult.findings
      .filter(finding => finding.type === 'rate_limit')
      .map(finding => finding.remediation || '');
  }
}