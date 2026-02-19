export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AlertChannel = 'slack' | 'email' | 'webhook';

export interface PolicyAlert {
  id: string;
  severity: AlertSeverity;
  channels: AlertChannel[];
  message: string;
  metadata: Record<string, unknown>;
  throttling: number;
}

export interface AlertConfig {
  enabled: boolean;
  minSeverity: AlertSeverity;
  defaultChannels: AlertChannel[];
}