import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const minimumPasswordLength: Policy = {
  id: 'SEC-PWD-001',
  name: 'Minimum Password Length',
  description: 'Passwords must be at least 12 characters long',
  severity: 'HIGH',
  category: 'security',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const minLength = 12;
    const isCompliant = resource.passwordPolicy?.minLength >= minLength;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'SEC-PWD-001',
        resourceId: resource.id,
        message: `Password minimum length must be at least ${minLength} characters`,
        severity: 'HIGH',
        remediation: `Update password policy to require minimum length of ${minLength} characters`
      }]
    };
  }
};

export const mfaEnabled: Policy = {
  id: 'SEC-MFA-001',
  name: 'MFA Required',
  description: 'Multi-factor authentication must be enabled for all users',
  severity: 'CRITICAL',
  category: 'security',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const isCompliant = resource.mfaEnabled === true;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'SEC-MFA-001',
        resourceId: resource.id,
        message: 'Multi-factor authentication is not enabled',
        severity: 'CRITICAL',
        remediation: 'Enable MFA for the user or service account'
      }]
    };
  }
};