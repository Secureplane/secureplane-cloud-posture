import { Finding } from '../../../types';
import { Logger } from '../../../utils/logger';

export class ValidationAnalyzer {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  analyzeDataValidation(findings: Finding[]): any {
    this.logger.info('Analyzing data validation');
    return {
      input: this.analyzeInputValidation(findings),
      output: this.analyzeOutputValidation(findings),
      schema: this.analyzeSchemaValidation(findings)
    };
  }

  private analyzeInputValidation(findings: Finding[]): any {
    return findings
      .filter(finding => finding.type === 'input_validation')
      .map(finding => ({
        endpoint: finding.description,
        secure: finding.severity === 'LOW'
      }));
  }

  private analyzeOutputValidation(findings: Finding[]): any {
    return findings
      .filter(finding => finding.type === 'output_validation')
      .map(finding => ({
        endpoint: finding.description,
        secure: finding.severity === 'LOW'
      }));
  }

  private analyzeSchemaValidation(findings: Finding[]): any {
    return findings
      .filter(finding => finding.type === 'schema_validation')
      .map(finding => ({
        endpoint: finding.description,
        secure: finding.severity === 'LOW'
      }));
  }
}