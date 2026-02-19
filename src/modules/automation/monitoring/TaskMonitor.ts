import { Logger } from '../../../utils/Logger';
import { TaskStatus, MonitoringMetrics } from '../types/MonitoringTypes';
import { TaskResult } from '../types/AutomationTypes';

export class TaskMonitor {
  private logger: Logger;
  private metrics: Map<string, MonitoringMetrics>;

  constructor() {
    this.logger = new Logger('TaskMonitor');
    this.metrics = new Map();
  }

  async trackTaskExecution(taskId: string, result: TaskResult): Promise<void> {
    try {
      const metrics = this.calculateMetrics(result);
      this.metrics.set(taskId, metrics);
      await this.updateTaskStatus(taskId, result.status);
    } catch (error) {
      this.logger.error(`Failed to track task execution: ${error.message}`);
      throw error;
    }
  }

  private calculateMetrics(result: TaskResult): MonitoringMetrics {
    return {
      executionTime: result.duration || 0,
      status: result.status,
      lastRun: result.timestamp,
      errorCount: result.status === 'failed' ? 1 : 0
    };
  }

  private async updateTaskStatus(taskId: string, status: TaskStatus): Promise<void> {
    this.logger.info(`Task ${taskId} status updated to ${status}`);
  }
}