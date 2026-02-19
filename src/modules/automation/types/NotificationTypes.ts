export interface NotificationConfig {
  enabled: boolean;
  notifyOnSuccess: boolean;
  channels: NotificationChannel[];
}

export interface NotificationChannel {
  type: 'email' | 'slack' | 'webhook';
  config: Record<string, any>;
}

export interface Notification {
  id: string;
  taskId: string;
  type: 'error' | 'success' | 'warning';
  message: string;
  timestamp: Date;
}