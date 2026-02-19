import { Logger } from '../../../utils/Logger';
import { NotificationConfig, Notification } from '../types/NotificationTypes';
import { TaskResult } from '../types/AutomationTypes';

export class NotificationManager {
  private logger: Logger;
  private config: NotificationConfig;

  constructor(config: NotificationConfig) {
    this.logger = new Logger('NotificationManager');
    this.config = config;
  }

  async sendNotification(result: TaskResult): Promise<void> {
    if (!this.shouldNotify(result)) {
      return;
    }

    const notification = this.createNotification(result);
    await this.dispatchNotification(notification);
  }

  private shouldNotify(result: TaskResult): boolean {
    return result.status === 'failed' || this.config.notifyOnSuccess;
  }

  private createNotification(result: TaskResult): Notification {
    return {
      id: `notif-${Date.now()}`,
      taskId: result.taskId,
      type: result.status === 'failed' ? 'error' : 'success',
      message: this.createMessage(result),
      timestamp: new Date()
    };
  }

  private createMessage(result: TaskResult): string {
    return result.status === 'failed'
      ? `Task ${result.taskId} failed: ${result.error}`
      : `Task ${result.taskId} completed successfully`;
  }

  private async dispatchNotification(notification: Notification): Promise<void> {
    this.logger.info(`Sending notification: ${notification.message}`);
    // Implement actual notification dispatch
  }
}