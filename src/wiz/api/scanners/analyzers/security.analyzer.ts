import { Finding } from '../../../types';
import { Logger } from '../../../utils/logger';

export class SecurityHeaderAnalyzer {
  private logger: Logger;
  private requiredHeaders = [
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Strict-Transport-Security'
  ];

  constructor() {
    this.logger = new Logger();
  }

  analyzeHeaders(findings: Finding[]): any {
    this.logger.info('Analyzing security headers');
    return {
      present: this.checkPresentHeaders(findings),
      missing: this.checkMissingHeaders(findings),
      cors: this.analyzeCorsConfig(findings)
    };
  }

  private checkPresentHeaders(findings: Finding[]): string[] {
    return findings
      .filter(finding => 
        finding.type === 'security_header' && 
        finding.severity === 'LOW'
      )
      .map(finding => finding.description);
  }

  private checkMissingHeaders(findings: Finding[]): string[] {
    const presentHeaders = this.checkPresentHeaders(findings);
    return this.requiredHeaders.filter(header => 
      !presentHeaders.includes(header)
    );
  }

  private analyzeCorsConfig(findings: Finding[]): any {
    return findings
      .filter(finding => finding.type === 'cors_configuration')
      .map(finding => ({
        config: finding.description,
        secure: finding.severity === 'LOW'
      }));
  }
}