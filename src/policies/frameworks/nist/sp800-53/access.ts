import { Policy, PolicyResult } from '../../../types/PolicyTypes';

export const accessControlPolicy: Policy = {
  id: 'NIST-AC-1',
  name: 'Access Control Policy and Procedures',
  description: 'Organization must develop and maintain access control policies',
  severity: 'HIGH',
  category: 'framework',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasPolicy = resource.accessControlPolicy?.exists === true;
    const isReviewed = resource.accessControlPolicy?.lastReviewDate 
      ? (Date.now() - new Date(resource.accessControlPolicy.lastReviewDate).getTime()) < (365 * 24 * 60 * 60 * 1000)
      : false;

    const isCompliant = hasPolicy && isReviewed;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'NIST-AC-1',
        resourceId: resource.id,
        message: 'Access control policy is missing or not reviewed within the last year',
        severity: 'HIGH',
        remediation: 'Develop and maintain access control policies with annual review'
      }]
    };
  }
};

export const accountManagement: Policy = {
  id: 'NIST-AC-2',
  name: 'Account Management',
  description: 'Organization must manage information system accounts',
  severity: 'HIGH',
  category: 'framework',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasAccountManagement = resource.accountManagement?.enabled === true;
    const hasAuditTrail = resource.accountManagement?.auditEnabled === true;

    const isCompliant = hasAccountManagement && hasAuditTrail;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'NIST-AC-2',
        resourceId: resource.id,
        message: 'Account management controls or audit trail are missing',
        severity: 'HIGH',
        remediation: 'Enable account management controls and audit logging'
      }]
    };
  }
};