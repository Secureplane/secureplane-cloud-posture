```typescript
import { Logger } from '../../../utils/logger';
import { TerraformRunTaskService } from './TerraformRunTaskService';
import { IaCRunTaskConfig, IaCRunTaskResult } from '../types/IaCTypes';

export class RunTaskManager {
  private logger: Logger;
  private terraformService: TerraformRunTaskService;

  constructor(terraformService: TerraformRunTaskService) {
    this.logger = new Logger();
    this.terraformService = terraformService;
  }

  async handleRunTask(config: IaCRunTaskConfig): Promise<IaCRunTaskResult> {
    try {
      this.logger.info(`Processing run task for workspace: ${config.workspaceName}`);

      const startTime = new Date();
      const scanResult = await this.terraformService.scanTerraformPlan({
        workspaceId: `${config.organizationName}/${config.workspaceName}`,
        content: await this.fetchPlanContent(config),
        enforcementLevel: config.enforcementLevel,
        policySet: config.policySet
      });

      const endTime = new Date();

      return {
        taskId: this.generateTaskId(),
        status: scanResult.status === 'pass' ? 'passed' : 'failed',
        findings: scanResult.findings,
        metadata: {
          startTime,
          endTime,
          duration: endTime.getTime() - startTime.getTime()
        }
      };
    } catch (error) {
      this.logger.error(`Run task processing failed: ${error.message}`);
      throw error;
    }
  }

  private async fetchPlanContent(config: IaCRunTaskConfig): Promise<string> {
    // Implementation to fetch plan content from Terraform Cloud
    return '';
  }

  private generateTaskId(): string {
    return `wiz-task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
```