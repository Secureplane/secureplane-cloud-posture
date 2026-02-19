import { Logger } from '../../../utils/Logger';
import { RetryConfig, RetryAttempt } from '../types/RetryTypes';
import { TaskResult } from '../types/AutomationTypes';

export class RetryManager {
  private logger: Logger;
  private retryConfigs: Map<string, RetryConfig>;
  private attempts: Map<string, RetryAttempt[]>;

  constructor() {
    this.logger = new Logger('RetryManager');
    this.retryConfigs = new Map();
    this.attempts = new Map();
  }

  async handleFailure(result: TaskResult): Promise<boolean> {
    try {
      if (!this.shouldRetry(result)) {
        return false;
      }

      const attempt = await this.recordAttempt(result);
      if (await this.canRetry(result.taskId, attempt)) {
        await this.scheduleRetry(result.taskId);
        return true;
      }

      return false;
    } catch (error) {
      this.logger.error(`Retry handling failed: ${error.message}`);
      throw error;
    }
  }

  private shouldRetry(result: TaskResult): boolean {
    const config = this.retryConfigs.get(result.taskId);
    return config?.enabled && result.status === 'failed';
  }

  private async recordAttempt(result: TaskResult): Promise<RetryAttempt> {
    const attempt = {
      timestamp: new Date(),
      error: result.error,
      attemptNumber: this.getAttemptCount(result.taskId) + 1
    };

    const taskAttempts = this.attempts.get(result.taskId) || [];
    taskAttempts.push(attempt);
    this.attempts.set(result.taskId, taskAttempts);

    return attempt;
  }

  private async canRetry(taskId: string, attempt: RetryAttempt): Promise<boolean> {
    const config = this.retryConfigs.get(taskId);
    return attempt.attemptNumber < (config?.maxAttempts || 3);
  }

  private async scheduleRetry(taskId: string): Promise<void> {
    this.logger.info(`Scheduling retry for task ${taskId}`);
    // Implement retry scheduling
  }

  private getAttemptCount(taskId: string): number {
    return this.attempts.get(taskId)?.length || 0;
  }
}