export interface ModuleConfig {
  cspm?: any;
  cwpp?: any;
  dspm?: any;
  iac?: any;
}

export interface MonitoringConfig {
  alerting: {
    slack_webhook?: string;
    email?: string;
  };
  metrics: {
    enabled: boolean;
    retention: number;
  };
  logging: {
    level: string;
    destination: string;
  };
}

export interface DeploymentStatus {
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  timestamp: Date;
  error?: string;
  components: {
    name: string;
    status: string;
    message?: string;
  }[];
}