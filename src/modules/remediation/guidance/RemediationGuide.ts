import { Logger } from '../../../utils/Logger';
import { RemediationStep, RemediationGuide } from '../types/RemediationTypes';

export class RemediationGuideGenerator {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('RemediationGuide');
  }

  async generateGuide(finding: any): Promise<RemediationGuide> {
    try {
      const steps = await this.generateRemediationSteps(finding);
      return {
        findingId: finding.id,
        title: `Remediation Guide for ${finding.title}`,
        description: finding.description,
        severity: finding.severity,
        steps,
        metadata: {
          generated: new Date(),
          estimatedTime: this.estimateRemediationTime(steps)
        }
      };
    } catch (error) {
      this.logger.error(`Failed to generate remediation guide: ${error.message}`);
      throw error;
    }
  }

  private async generateRemediationSteps(finding: any): Promise<RemediationStep[]> {
    return [
      {
        order: 1,
        title: 'Analyze Current Configuration',
        description: 'Review the current configuration that led to this finding',
        command: this.generateAnalysisCommand(finding),
        validation: this.generateValidationStep(finding)
      },
      {
        order: 2,
        title: 'Apply Required Changes',
        description: 'Make the necessary configuration changes to address the finding',
        command: this.generateRemediationCommand(finding),
        validation: this.generatePostRemediationCheck(finding)
      }
    ];
  }

  private generateAnalysisCommand(finding: any): string {
    // Generate appropriate analysis command
    return `aws configservice get-resource-config-history --resource-type ${finding.resourceType} --resource-id ${finding.resourceId}`;
  }

  private generateRemediationCommand(finding: any): string {
    // Generate remediation command
    return `aws configservice put-remediation-configurations --config-rule-name ${finding.ruleId} --remediation-configuration file://remediation.json`;
  }

  private generateValidationStep(finding: any): string {
    // Generate validation command
    return `aws configservice get-compliance-details-by-resource --resource-type ${finding.resourceType} --resource-id ${finding.resourceId}`;
  }

  private generatePostRemediationCheck(finding: any): string {
    // Generate post-remediation check
    return `aws configservice start-config-rules-evaluation --config-rule-names ${finding.ruleId}`;
  }

  private estimateRemediationTime(steps: RemediationStep[]): number {
    // Estimate time in minutes
    return steps.length * 15;
  }
}