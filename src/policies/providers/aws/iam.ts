import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const iamLeastPrivilege: Policy = {
  id: 'AWS-IAM-001',
  name: 'IAM Least Privilege',
  description: 'IAM roles must follow least privilege principle',
  severity: 'HIGH',
  category: 'cloud',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasWildcards = resource.policy?.statements.some(
      (stmt: any) => stmt.actions.includes('*') || stmt.resources.includes('*')
    );

    return {
      compliant: !hasWildcards,
      violations: !hasWildcards ? [] : [{
        policyId: 'AWS-IAM-001',
        resourceId: resource.id,
        message: 'IAM policy contains wildcard permissions',
        severity: 'HIGH',
        remediation: 'Replace wildcards with specific actions and resources'
      }]
    };
  }
};