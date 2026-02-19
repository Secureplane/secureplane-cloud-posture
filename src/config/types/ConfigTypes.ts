export interface WizConfig {
  api: ApiConfig;
  scanning: ScanningConfig;
  security: SecurityConfig;
  reporting: ReportingConfig;
  integrations: IntegrationsConfig;
}

export interface ApiConfig {
  endpoint: string;
  timeout: number;
  retries: number;
  credentials: {
    apiKey: string;
    apiSecret: string;
  };
}

export interface ScanningConfig {
  interval: number;
  parallel: number;
  modules: {
    vulnerability: boolean;
    cloud: boolean;
    kubernetes: boolean;
    container: boolean;
  };
}

export interface SecurityConfig {
  minSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  enableAttackPaths: boolean;
  networkPolicies: boolean;
  podSecurity: boolean;
}

export interface ReportingConfig {
  format: 'json' | 'html' | 'pdf';
  destination: string;
  includeRemediation: boolean;
}

export interface IntegrationsConfig {
  cloudProviders: {
    aws: boolean;
    azure: boolean;
    gcp: boolean;
  };
  cicd: {
    gitlab: boolean;
    github: boolean;
  };
}