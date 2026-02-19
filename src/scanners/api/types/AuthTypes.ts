export interface AuthConfig {
  jwt?: {
    requiredAlgorithms: string[];
    minKeySize: number;
  };
  oauth?: {
    requiredFlows: string[];
  };
  mfa?: {
    required: boolean;
  };
}

export interface AuthScanResult {
  jwtConfig: any;
  oauth: any;
  mfa: any;
  timestamp: Date;
}