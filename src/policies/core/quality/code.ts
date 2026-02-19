import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const codeLinting: Policy = {
  id: 'QUAL-CODE-001',
  name: 'Code Linting Requirements',
  description: 'Code must pass linting checks before deployment',
  severity: 'HIGH',
  category: 'governance',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const lintPassed = resource.linting?.passed === true;
    const noErrors = (resource.linting?.errors || 0) === 0;

    const isCompliant = lintPassed && noErrors;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'QUAL-CODE-001',
        resourceId: resource.id,
        message: 'Code failed linting checks',
        severity: 'HIGH',
        remediation: 'Fix all linting errors before deployment'
      }]
    };
  }
};

export const testCoverage: Policy = {
  id: 'QUAL-TEST-001',
  name: 'Test Coverage Requirements',
  description: 'Code must maintain minimum test coverage of 80%',
  severity: 'HIGH',
  category: 'governance',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const minCoverage = 80;
    const actualCoverage = resource.testing?.coverage || 0;
    const isCompliant = actualCoverage >= minCoverage;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'QUAL-TEST-001',
        resourceId: resource.id,
        message: `Test coverage (${actualCoverage}%) below required ${minCoverage}%`,
        severity: 'HIGH',
        remediation: 'Add tests to meet minimum coverage requirements'
      }]
    };
  }
};