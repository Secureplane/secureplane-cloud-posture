import { Logger } from '../../utils/Logger';
import { AutomationTask, TaskResult } from './types/AutomationTypes';
import { TaskRunner } from './runners/TaskRunner';
import { TaskScheduler } from './scheduling/TaskScheduler';

export class AutomationManager {
  private logger: Logger;
  private taskRunner: TaskRunner;
  private scheduler: TaskScheduler;

  constructor() {
    this.logger = new Logger('AutomationManager');
    this.taskRunner = new TaskRunner();
    this.scheduler = new TaskScheduler();
  }

  async scheduleTask(task: AutomationTask): Promise<void> {
    try {
      await this.scheduler.schedule(task);
      this.logger.info(`Scheduled task: ${task.id}`);
    } catch (error) {
      this.logger.error(`Failed to schedule task: ${error.message}`);
      throw error;
    }
  }

  async executeTask(taskId: string): Promise<TaskResult> {
    try {
      return await this.taskRunner.execute(taskId);
    } catch (error) {
      this.logger.error(`Task execution failed: ${error.message}`);
      throw error;
    }
  }
}