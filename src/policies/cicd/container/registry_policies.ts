```typescript
import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const containerScanningPolicy: Policy = {
  id: 'CICD-CONT-001',
  name: 'Container Image Scanning',
  description: 'Enforce container image scanning before deployment',
  severity: 'CRITICAL',
  category: 'security',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const isScanned = resource.securityScan?.completed === true;
    const noHighVulns = (resource.securityScan?.highVulnerabilities || 0) === 0;

    return {
      compliant: isScanned && noHighVulns,
      violations: isScanned && noHighVulns ? [] : [{
        policyId: 'CICD-CONT-001',
        resourceId: resource.id,
        message: 'Container image must be scanned and free of high vulnerabilities',
        severity: 'CRITICAL',
        remediation: 'Run security scan and fix high severity vulnerabilities'
      }]
    };
  }
};

export const registryAccessPolicy: Policy = {
  id: 'CICD-CONT-002',
  name: 'Registry Access Control',
  description: 'Enforce registry access controls',
  severity: 'HIGH',
  category: 'security',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasAccessControl = resource.registry?.accessControl === true;
    const authenticatedOnly = resource.registry?.publicAccess === false;

    return {
      compliant: hasAccessControl && authenticatedOnly,
      violations: hasAccessControl && authenticatedOnly ? [] : [{
        policyId: 'CICD-CONT-002',
        resourceId: resource.id,
        message: 'Registry must have access controls and disable public access',
        severity: 'HIGH',
        remediation: 'Enable access controls and disable public access'
      }]
    };
  }
};
```