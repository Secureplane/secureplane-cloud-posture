import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const dataEncryption: Policy = {
  id: 'SEC-ENC-001',
  name: 'Data Encryption Required',
  description: 'All sensitive data must be encrypted at rest',
  severity: 'CRITICAL',
  category: 'security',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const isCompliant = resource.encryption?.enabled === true;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'SEC-ENC-001',
        resourceId: resource.id,
        message: 'Data encryption is not enabled',
        severity: 'CRITICAL',
        remediation: 'Enable encryption for the data store'
      }]
    };
  }
};

export const strongEncryptionAlgorithm: Policy = {
  id: 'SEC-ENC-002',
  name: 'Strong Encryption Algorithm',
  description: 'Must use approved encryption algorithms (AES-256 or stronger)',
  severity: 'HIGH',
  category: 'security',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const approvedAlgorithms = ['AES-256-GCM', 'AES-256-CBC'];
    const isCompliant = approvedAlgorithms.includes(resource.encryption?.algorithm);

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'SEC-ENC-002',
        resourceId: resource.id,
        message: 'Unapproved encryption algorithm in use',
        severity: 'HIGH',
        remediation: `Use an approved encryption algorithm: ${approvedAlgorithms.join(', ')}`
      }]
    };
  }
};