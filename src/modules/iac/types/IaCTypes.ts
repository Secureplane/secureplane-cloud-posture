```typescript
export interface TerraformPlan {
  workspaceId: string;
  content: string;
  enforcementLevel: 'advisory' | 'mandatory';
  policySet: string[];
}

export interface IaCRunTaskConfig {
  organizationName: string;
  workspaceName: string;
  enforcementLevel: 'advisory' | 'mandatory';
  policySet: string[];
  webhookUrl: string;
  apiToken: string;
}

export interface IaCRunTaskResult {
  taskId: string;
  status: 'pending' | 'passed' | 'failed';
  findings: IaCFinding[];
  metadata: {
    startTime: Date;
    endTime: Date;
    duration: number;
  };
}

export interface IaCFinding {
  id: string;
  title: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: string;
  resourceType: string;
  description: string;
  remediation?: string;
  enforced: boolean;
}

export interface IaCScanResult {
  workspaceId: string;
  status: 'pass' | 'fail';
  findings: IaCFinding[];
  metadata: {
    scanTime: Date;
    policySet: string[];
    enforcementLevel: 'advisory' | 'mandatory';
  };
}
```