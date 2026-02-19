```typescript
import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const resourceTaggingPolicy: Policy = {
  id: 'CICD-COST-001',
  name: 'Resource Tagging Policy',
  description: 'Enforce resource tagging for cost allocation',
  severity: 'HIGH',
  category: 'cost',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const requiredTags = ['environment', 'project', 'owner'];
    const hasTags = resource.tags && Object.keys(resource.tags).length > 0;
    const hasRequiredTags = requiredTags.every(tag => resource.tags?.[tag]);

    return {
      compliant: hasTags && hasRequiredTags,
      violations: hasTags && hasRequiredTags ? [] : [{
        policyId: 'CICD-COST-001',
        resourceId: resource.id,
        message: 'Resource missing required cost allocation tags',
        severity: 'HIGH',
        remediation: `Add required tags: ${requiredTags.join(', ')}`
      }]
    };
  }
};

export const costApprovalPolicy: Policy = {
  id: 'CICD-COST-002',
  name: 'High-Cost Resource Approval',
  description: 'Enforce approvals for high-cost resources',
  severity: 'HIGH',
  category: 'cost',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const costThreshold = 1000; // USD
    const estimatedCost = resource.cost?.estimated || 0;
    const hasApproval = estimatedCost < costThreshold || resource.cost?.approved;

    return {
      compliant: hasApproval,
      violations: hasApproval ? [] : [{
        policyId: 'CICD-COST-002',
        resourceId: resource.id,
        message: 'High-cost resource requires approval',
        severity: 'HIGH',
        remediation: 'Obtain approval for high-cost resource deployment'
      }]
    };
  }
};
```