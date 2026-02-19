```typescript
import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const deploymentApprovalPolicy: Policy = {
  id: 'CICD-DEPL-001',
  name: 'Deployment Approval Requirements',
  description: 'Enforce deployment approval gates',
  severity: 'CRITICAL',
  category: 'governance',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasApproval = resource.deployment?.approved === true;
    const validApprover = resource.deployment?.approver !== resource.deployment?.requester;

    return {
      compliant: hasApproval && validApprover,
      violations: hasApproval && validApprover ? [] : [{
        policyId: 'CICD-DEPL-001',
        resourceId: resource.id,
        message: 'Deployment requires valid approval',
        severity: 'CRITICAL',
        remediation: 'Obtain approval from authorized approver'
      }]
    };
  }
};

export const rollbackPolicy: Policy = {
  id: 'CICD-DEPL-002',
  name: 'Deployment Rollback Policy',
  description: 'Enforce rollback configuration',
  severity: 'HIGH',
  category: 'governance',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasRollback = resource.deployment?.rollbackEnabled === true;
    const hasHealthChecks = resource.deployment?.healthChecks === true;

    return {
      compliant: hasRollback && hasHealthChecks,
      violations: hasRollback && hasHealthChecks ? [] : [{
        policyId: 'CICD-DEPL-002',
        resourceId: resource.id,
        message: 'Deployment must have rollback and health checks configured',
        severity: 'HIGH',
        remediation: 'Enable rollback configuration and health checks'
      }]
    };
  }
};
```