import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const licenseScan: Policy = {
  id: 'COMP-LIC-001',
  name: 'License Compliance Check',
  description: 'All dependencies must have approved licenses',
  severity: 'HIGH',
  category: 'compliance',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const approvedLicenses = ['MIT', 'Apache-2.0', 'BSD-3-Clause', 'ISC'];
    const hasUnapproved = (resource.dependencies?.packages || []).some(
      (pkg: any) => !approvedLicenses.includes(pkg.license)
    );

    return {
      compliant: !hasUnapproved,
      violations: !hasUnapproved ? [] : [{
        policyId: 'COMP-LIC-001',
        resourceId: resource.id,
        message: 'Project contains dependencies with unapproved licenses',
        severity: 'HIGH',
        remediation: `Use only dependencies with approved licenses: ${approvedLicenses.join(', ')}`
      }]
    };
  }
};

export const licenseDocumentation: Policy = {
  id: 'COMP-LIC-002',
  name: 'License Documentation',
  description: 'All licenses must be properly documented',
  severity: 'HIGH',
  category: 'compliance',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasLicenseFile = resource.repository?.licenseFile === true;
    const hasThirdPartyNotices = resource.repository?.thirdPartyNotices === true;

    const isCompliant = hasLicenseFile && hasThirdPartyNotices;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'COMP-LIC-002',
        resourceId: resource.id,
        message: 'Missing license documentation',
        severity: 'HIGH',
        remediation: 'Add LICENSE file and THIRD-PARTY-NOTICES file'
      }]
    };
  }
};