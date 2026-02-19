import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const containerImageScanning: Policy = {
  id: 'SEC-CONT-001',
  name: 'Container Image Scanning',
  description: 'Container images must be scanned for vulnerabilities before deployment',
  severity: 'CRITICAL',
  category: 'security',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const isScanned = resource.securityScan?.completed === true;
    const noHighVulns = (resource.securityScan?.highVulnerabilities || 0) === 0;

    const isCompliant = isScanned && noHighVulns;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'SEC-CONT-001',
        resourceId: resource.id,
        message: 'Container image has not been scanned or contains high vulnerabilities',
        severity: 'CRITICAL',
        remediation: 'Scan container image and remediate high severity vulnerabilities'
      }]
    };
  }
};

export const registryAccess: Policy = {
  id: 'SEC-CONT-002',
  name: 'Container Registry Access Control',
  description: 'Container registry access must be restricted',
  severity: 'HIGH',
  category: 'security',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasAccessControl = resource.registry?.accessControl === true;
    const authenticatedOnly = resource.registry?.publicAccess === false;

    const isCompliant = hasAccessControl && authenticatedOnly;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'SEC-CONT-002',
        resourceId: resource.id,
        message: 'Container registry has insufficient access controls',
        severity: 'HIGH',
        remediation: 'Enable access controls and disable public access'
      }]
    };
  }
};