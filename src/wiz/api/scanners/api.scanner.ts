import { BaseScanner } from '../base/scanner';
import { ApiScanOptions, ApiScanResult } from './types';
import { AuthAnalyzer, SecurityHeaderAnalyzer, ValidationAnalyzer, RateLimitAnalyzer } from './analyzers';
import { ApiScanConfig, defaultConfig } from './config/scan.config';
import { Logger } from '../../utils/logger';

export class ApiScanner extends BaseScanner {
  private logger: Logger;
  private config: ApiScanConfig;
  private authAnalyzer: AuthAnalyzer;
  private securityAnalyzer: SecurityHeaderAnalyzer;
  private validationAnalyzer: ValidationAnalyzer;
  private rateLimitAnalyzer: RateLimitAnalyzer;

  constructor(config: Partial<ApiScanConfig> = {}) {
    super();
    this.logger = new Logger();
    this.config = { ...defaultConfig, ...config };
    this.authAnalyzer = new AuthAnalyzer();
    this.securityAnalyzer = new SecurityHeaderAnalyzer();
    this.validationAnalyzer = new ValidationAnalyzer();
    this.rateLimitAnalyzer = new RateLimitAnalyzer();
  }

  async scanApi(endpoint: string, options: ApiScanOptions): Promise<ApiScanResult> {
    this.logger.info(`Starting API scan for endpoint: ${endpoint}`);
    
    try {
      const scanResponse = await this.executeScan({
        resourceId: endpoint,
        scanType: 'api',
        options: {
          ...options,
          config: this.config
        }
      });

      const analysis = {
        auth: this.authAnalyzer.analyzeAuthentication(scanResponse.findings),
        security: this.securityAnalyzer.analyzeHeaders(scanResponse.findings),
        validation: this.validationAnalyzer.analyzeDataValidation(scanResponse.findings),
        rateLimit: this.rateLimitAnalyzer.analyzeRateLimiting(scanResponse.findings)
      };

      return {
        findings: scanResponse.findings,
        metadata: {
          scanTime: new Date(),
          duration: scanResponse.metadata.duration,
          scannedEndpoints: [endpoint]
        },
        recommendations: this.generateRecommendations(scanResponse.findings, analysis),
        analysis
      };
    } catch (error) {
      this.logger.error(`API scan failed: ${error}`);
      throw error;
    }
  }

  private generateRecommendations(findings: Finding[], analysis: any): ApiRecommendation[] {
    return findings
      .filter(finding => finding.severity === 'HIGH' || finding.severity === 'CRITICAL')
      .map(finding => ({
        findingId: finding.id,
        priority: this.mapSeverityToPriority(finding.severity),
        description: finding.description,
        remediation: finding.remediation || 'No remediation provided',
        context: this.getAnalysisContext(finding, analysis)
      }));
  }

  private mapSeverityToPriority(severity: string): 'low' | 'medium' | 'high' {
    switch (severity) {
      case 'CRITICAL':
      case 'HIGH':
        return 'high';
      case 'MEDIUM':
        return 'medium';
      default:
        return 'low';
    }
  }

  private getAnalysisContext(finding: Finding, analysis: any): any {
    switch (finding.type) {
      case 'authentication':
        return analysis.auth;
      case 'security_header':
        return analysis.security;
      case 'validation':
        return analysis.validation;
      case 'rate_limit':
        return analysis.rateLimit;
      default:
        return null;
    }
  }
}