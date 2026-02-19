```typescript
export interface SecurityCheck {
  id: string;
  category: SecurityCategory;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  impact: string;
  remediation?: string;
  resources: string[];
}

export type SecurityCategory = 
  | 'access_control'
  | 'encryption'
  | 'network_security'
  | 'logging_monitoring'
  | 'resource_configuration';

export interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: SecurityCategory;
  provider: string[];
  check: (resource: any) => boolean;
}

export interface SecurityViolation {
  policyId: string;
  resourceId: string;
  details: string;
  context: Record<string, any>;
}
```