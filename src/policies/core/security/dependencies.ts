import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const dependencyScanning: Policy = {
  id: 'SEC-DEP-001',
  name: 'Dependency Vulnerability Scanning',
  description: 'Dependencies must be scanned for known vulnerabilities',
  severity: 'CRITICAL',
  category: 'security',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const isScanned = resource.dependencies?.scanned === true;
    const noCriticalVulns = (resource.dependencies?.criticalVulnerabilities || 0) === 0;
    const noHighVulns = (resource.dependencies?.highVulnerabilities || 0) === 0;

    const isCompliant = isScanned && noCriticalVulns && noHighVulns;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'SEC-DEP-001',
        resourceId: resource.id,
        message: 'Dependencies contain critical or high vulnerabilities',
        severity: 'CRITICAL',
        remediation: 'Update vulnerable dependencies to secure versions'
      }]
    };
  }
};

export const outdatedDependencies: Policy = {
  id: 'SEC-DEP-002',
  name: 'Outdated Dependencies Check',
  description: 'Dependencies must not be significantly outdated',
  severity: 'HIGH',
  category: 'security',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const maxAge = 180; // days
    const hasOutdated = (resource.dependencies?.packages || []).some(
      (pkg: any) => {
        const lastUpdate = new Date(pkg.lastUpdateDate).getTime();
        return (Date.now() - lastUpdate) > (maxAge * 24 * 60 * 60 * 1000);
      }
    );

    return {
      compliant: !hasOutdated,
      violations: !hasOutdated ? [] : [{
        policyId: 'SEC-DEP-002',
        resourceId: resource.id,
        message: 'One or more dependencies are significantly outdated',
        severity: 'HIGH',
        remediation: 'Update outdated dependencies to recent versions'
      }]
    };
  }
};