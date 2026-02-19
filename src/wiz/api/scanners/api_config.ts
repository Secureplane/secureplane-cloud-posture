export interface ApiScanConfig {
  endpoints: string[];
  authentication: {
    required: boolean;
    methods: string[];
    jwtConfig?: {
      algorithms: string[];
      minKeySize: number;
    };
  };
  authorization: {
    rbacRequired: boolean;
    scopeValidation: boolean;
  };
  rateLimit: {
    required: boolean;
    defaultRate: number;
    burstSize: number;
  };
  securityHeaders: {
    required: string[];
    cors: {
      allowedOrigins: string[];
      allowedMethods: string[];
      allowCredentials: boolean;
    };
  };
  dataValidation: {
    inputValidation: boolean;
    outputEncoding: boolean;
    schemaValidation: boolean;
  };
}

export interface ApiScanResult {
  endpoint: string;
  timestamp: Date;
  findings: ApiFinding[];
  recommendations: ApiRecommendation[];
  metadata: {
    scanDuration: number;
    apiVersion?: string;
    framework?: string;
  };
}

export interface ApiFinding {
  id: string;
  category: 'authentication' | 'authorization' | 'validation' | 'security_header' | 'rate_limit';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  impact: string;
  remediation?: string;
}

export interface ApiRecommendation {
  findingId: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  implementation?: string;
  references?: string[];
}