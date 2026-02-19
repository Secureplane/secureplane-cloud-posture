import { Policy, PolicyResult } from '../../../types/PolicyTypes';

export const systemAvailability: Policy = {
  id: 'NIST-CP-2',
  name: 'Contingency Planning',
  description: 'System must have contingency and disaster recovery plans',
  severity: 'HIGH',
  category: 'framework',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasDRPlan = resource.disasterRecovery?.planExists === true;
    const planTested = resource.disasterRecovery?.lastTestDate
      ? (Date.now() - new Date(resource.disasterRecovery.lastTestDate).getTime()) < (180 * 24 * 60 * 60 * 1000)
      : false;

    const isCompliant = hasDRPlan && planTested;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'NIST-CP-2',
        resourceId: resource.id,
        message: 'Disaster recovery plan missing or not tested',
        severity: 'HIGH',
        remediation: 'Develop and test disaster recovery plan semi-annually'
      }]
    };
  }
};