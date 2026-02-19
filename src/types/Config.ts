export interface WizConfig {
  apiEndpoint: string;
  apiKey: string;
  apiSecret: string;
  region: string;
}

export interface ScannerConfig {
  interval: number;
  enabled: boolean;
  types: string[];
}

export interface MonitoringConfig {
  enabled: boolean;
  metrics: {
    interval: number;
    retention: number;
  };
  alerts: {
    slack?: string;
    email?: string;
  };
}