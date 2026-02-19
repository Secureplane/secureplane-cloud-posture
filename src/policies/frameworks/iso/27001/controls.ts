import { Policy, PolicyResult } from '../../../types/PolicyTypes';

export const informationSecurityPolicy: Policy = {
  id: 'ISO-A.5.1.1',
  name: 'Information Security Policies',
  description: 'Organization must have documented information security policies',
  severity: 'HIGH',
  category: 'framework',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasPolicy = resource.securityPolicies?.documented === true;
    const isApproved = resource.securityPolicies?.approved === true;
    const isReviewed = resource.securityPolicies?.lastReviewDate 
      ? (Date.now() - new Date(resource.securityPolicies.lastReviewDate).getTime()) < (365 * 24 * 60 * 60 * 1000)
      : false;

    const isCompliant = hasPolicy && isApproved && isReviewed;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'ISO-A.5.1.1',
        resourceId: resource.id,
        message: 'Information security policies are missing, unapproved, or not reviewed',
        severity: 'HIGH',
        remediation: 'Document, approve, and regularly review information security policies'
      }]
    };
  }
};

export const assetManagement: Policy = {
  id: 'ISO-A.8.1.1',
  name: 'Asset Inventory',
  description: 'Assets must be identified and inventoried',
  severity: 'HIGH',
  category: 'framework',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasInventory = resource.assetInventory?.exists === true;
    const isUpdated = resource.assetInventory?.lastUpdateDate
      ? (Date.now() - new Date(resource.assetInventory.lastUpdateDate).getTime()) < (90 * 24 * 60 * 60 * 1000)
      : false;

    const isCompliant = hasInventory && isUpdated;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'ISO-A.8.1.1',
        resourceId: resource.id,
        message: 'Asset inventory is missing or not regularly updated',
        severity: 'HIGH',
        remediation: 'Implement and maintain an asset inventory with quarterly updates'
      }]
    };
  }
};