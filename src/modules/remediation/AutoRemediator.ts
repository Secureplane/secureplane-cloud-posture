import { Logger } from '../../utils/Logger';
import { RemediationPlan, RemediationAction, RemediationResult } from './types/RemediationTypes';
import { ActionValidator } from './validators/ActionValidator';
import { RemediationExecutor } from './executors/RemediationExecutor';

export class AutoRemediator {
  private logger: Logger;
  private validator: ActionValidator;
  private executor: RemediationExecutor;

  constructor() {
    this.logger = new Logger('AutoRemediator');
    this.validator = new ActionValidator();
    this.executor = new RemediationExecutor();
  }

  async createRemediationPlan(findings: any[]): Promise<RemediationPlan> {
    try {
      const actions = await this.generateActions(findings);
      const validatedActions = await this.validateActions(actions);
      
      return {
        id: this.generatePlanId(),
        actions: validatedActions,
        metadata: {
          created: new Date(),
          totalActions: validatedActions.length,
          estimatedTime: this.estimateRemediationTime(validatedActions)
        }
      };
    } catch (error) {
      this.logger.error(`Failed to create remediation plan: ${error.message}`);
      throw error;
    }
  }

  async executeRemediationPlan(plan: RemediationPlan): Promise<RemediationResult> {
    try {
      const results = await Promise.all(
        plan.actions.map(action => this.executor.executeAction(action))
      );

      return {
        planId: plan.id,
        successful: results.every(r => r.success),
        results,
        metadata: {
          completedAt: new Date(),
          executionTime: this.calculateExecutionTime(results)
        }
      };
    } catch (error) {
      this.logger.error(`Remediation execution failed: ${error.message}`);
      throw error;
    }
  }

  private async generateActions(findings: any[]): Promise<RemediationAction[]> {
    return findings.map(finding => ({
      id: `action-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: this.determineActionType(finding),
      resource: finding.resourceId,
      parameters: this.generateActionParameters(finding),
      priority: finding.severity
    }));
  }

  private determineActionType(finding: any): string {
    // Determine appropriate remediation action
    return 'unknown';
  }

  private generateActionParameters(finding: any): Record<string, any> {
    // Generate action-specific parameters
    return {};
  }

  private async validateActions(actions: RemediationAction[]): Promise<RemediationAction[]> {
    return this.validator.validateActions(actions);
  }

  private generatePlanId(): string {
    return `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private estimateRemediationTime(actions: RemediationAction[]): number {
    // Estimate total remediation time in seconds
    return actions.length * 300; // 5 minutes per action estimate
  }

  private calculateExecutionTime(results: any[]): number {
    return results.reduce((total, result) => total + (result.duration || 0), 0);
  }
}