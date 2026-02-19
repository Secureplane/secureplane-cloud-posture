import { Logger } from '../../../utils/logger';
import { PolicyAlert, AlertConfig } from './types';

export class PolicyAlertManager {
  private logger: Logger;

  constructor(private config: AlertConfig) {
    this.logger = new Logger('PolicyAlerts');
  }

  async sendAlert(alert: PolicyAlert): Promise<void> {
    if (!this.shouldSendAlert(alert)) {
      return;
    }

    try {
      await Promise.all(
        alert.channels.map(channel => this.sendToChannel(channel, alert))
      );
    } catch (error) {
      this.logger.error(`Failed to send alert: ${error.message}`);
    }
  }

  private shouldSendAlert(alert: PolicyAlert): boolean {
    return this.config.enabled && 
           this.isSeverityMet(alert.severity) &&
           !this.isThrottled(alert);
  }

  private isSeverityMet(severity: string): boolean {
    const severityLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const configIndex = severityLevels.indexOf(this.config.minSeverity);
    const alertIndex = severityLevels.indexOf(severity);
    return alertIndex >= configIndex;
  }

  private isThrottled(alert: PolicyAlert): boolean {
    // Implement throttling logic
    return false;
  }

  private async sendToChannel(channel: string, alert: PolicyAlert): Promise<void> {
    // Implement channel-specific alert sending
    this.logger.info(`Sending ${alert.severity} alert to ${channel}`);
  }
}