import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const deploymentApproval: Policy = {
  id: 'GOV-DEP-001',
  name: 'Deployment Approval Required',
  description: 'Production deployments must be approved',
  severity: 'HIGH',
  category: 'governance',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasApproval = resource.deployment?.approved === true;
    const validApprover = resource.deployment?.approver !== resource.deployment?.requester;

    const isCompliant = hasApproval && validApprover;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'GOV-DEP-001',
        resourceId: resource.id,
        message: 'Deployment lacks required approvals',
        severity: 'HIGH',
        remediation: 'Obtain approval from authorized approver before deployment'
      }]
    };
  }
};

export const deploymentRollback: Policy = {
  id: 'GOV-DEP-002',
  name: 'Deployment Rollback Policy',
  description: 'Automated rollback must be configured for failed deployments',
  severity: 'HIGH',
  category: 'governance',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasRollback = resource.deployment?.rollbackEnabled === true;
    const hasHealthChecks = resource.deployment?.healthChecks === true;

    const isCompliant = hasRollback && hasHealthChecks;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'GOV-DEP-002',
        resourceId: resource.id,
        message: 'Deployment lacks automated rollback configuration',
        severity: 'HIGH',
        remediation: 'Enable automated rollback and health checks'
      }]
    };
  }
};