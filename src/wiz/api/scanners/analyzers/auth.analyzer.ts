import { Finding } from '../../../types';
import { Logger } from '../../../utils/logger';

export class AuthAnalyzer {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  analyzeAuthentication(findings: Finding[]): any {
    this.logger.info('Analyzing authentication configuration');
    return {
      methods: this.extractAuthMethods(findings),
      vulnerabilities: this.extractVulnerabilities(findings),
      jwtConfig: this.analyzeJwtConfig(findings)
    };
  }

  private extractAuthMethods(findings: Finding[]): string[] {
    return findings
      .filter(finding => finding.type === 'authentication')
      .map(finding => finding.description);
  }

  private extractVulnerabilities(findings: Finding[]): Finding[] {
    return findings.filter(finding => 
      finding.type === 'authentication' && 
      ['HIGH', 'CRITICAL'].includes(finding.severity)
    );
  }

  private analyzeJwtConfig(findings: Finding[]): any {
    return findings
      .filter(finding => finding.type === 'jwt_configuration')
      .map(finding => ({
        algorithm: finding.description,
        secure: finding.severity === 'LOW'
      }));
  }
}