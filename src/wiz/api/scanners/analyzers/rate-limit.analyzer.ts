import { Finding } from '../../../types';
import { Logger } from '../../../utils/logger';

export class RateLimitAnalyzer {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  analyzeRateLimiting(findings: Finding[]): any {
    this.logger.info('Analyzing rate limiting configuration');
    return {
      globalLimits: this.analyzeGlobalLimits(findings),
      endpointLimits: this.analyzeEndpointLimits(findings),
      burstProtection: this.analyzeBurstProtection(findings)
    };
  }

  private analyzeGlobalLimits(findings: Finding[]): any {
    return findings
      .filter(finding => finding.type === 'rate_limit_global')
      .map(finding => ({
        rate: finding.description,
        secure: finding.severity === 'LOW'
      }));
  }

  private analyzeEndpointLimits(findings: Finding[]): any {
    return findings
      .filter(finding => finding.type === 'rate_limit_endpoint')
      .map(finding => ({
        endpoint: finding.description,
        secure: finding.severity === 'LOW'
      }));
  }

  private analyzeBurstProtection(findings: Finding[]): any {
    return findings
      .filter(finding => finding.type === 'rate_limit_burst')
      .map(finding => ({
        config: finding.description,
        secure: finding.severity === 'LOW'
      }));
  }
}