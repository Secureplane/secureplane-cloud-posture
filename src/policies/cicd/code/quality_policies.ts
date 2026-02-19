```typescript
import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const codeLintingPolicy: Policy = {
  id: 'CICD-CODE-001',
  name: 'Code Linting Requirements',
  description: 'Enforce code linting standards',
  severity: 'HIGH',
  category: 'quality',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const lintPassed = resource.linting?.passed === true;
    const noErrors = (resource.linting?.errors || 0) === 0;

    return {
      compliant: lintPassed && noErrors,
      violations: lintPassed && noErrors ? [] : [{
        policyId: 'CICD-CODE-001',
        resourceId: resource.id,
        message: 'Code must pass linting checks',
        severity: 'HIGH',
        remediation: 'Fix linting errors before deployment'
      }]
    };
  }
};

export const testCoveragePolicy: Policy = {
  id: 'CICD-CODE-002',
  name: 'Test Coverage Requirements',
  description: 'Enforce minimum test coverage',
  severity: 'HIGH',
  category: 'quality',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const minCoverage = 80;
    const actualCoverage = resource.testing?.coverage || 0;

    return {
      compliant: actualCoverage >= minCoverage,
      violations: actualCoverage >= minCoverage ? [] : [{
        policyId: 'CICD-CODE-002',
        resourceId: resource.id,
        message: `Test coverage (${actualCoverage}%) below required ${minCoverage}%`,
        severity: 'HIGH',
        remediation: 'Add tests to meet minimum coverage requirements'
      }]
    };
  }
};
```