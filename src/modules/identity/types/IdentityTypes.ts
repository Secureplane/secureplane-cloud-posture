export type IdentityType = 'user' | 'service-account' | 'role' | 'group';

export interface IdentityScanResult {
  identityId: string;
  type: IdentityType;
  timestamp: Date;
  accessPatterns: AccessPattern[];
  riskAssessment: RiskAssessment;
  metadata: {
    scanDuration: number;
    status: 'pending' | 'running' | 'completed' | 'failed';
  };
}

export interface AccessPattern {
  type: 'resource_access' | 'permissions' | 'authentication';
  timestamp: Date;
  details: Record<string, any>;
}

export interface Permission {
  resource: string;
  action: string;
  effect: 'allow' | 'deny';
  conditions?: Record<string, any>;
}

export interface AuthenticationEvent {
  timestamp: Date;
  success: boolean;
  location: string;
  ipAddress: string;
  userAgent: string;
}

export interface ResourceAccess {
  resourceId: string;
  accessType: string;
  timestamp: Date;
  frequency: number;
}