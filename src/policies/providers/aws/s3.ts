import { Policy, PolicyResult } from '../../types/PolicyTypes';

export const s3PublicAccess: Policy = {
  id: 'AWS-S3-001',
  name: 'S3 Public Access Block',
  description: 'S3 buckets must have public access blocked',
  severity: 'CRITICAL',
  category: 'cloud',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const isPublicBlocked = resource.publicAccessBlock?.blockPublicAcls === true &&
                           resource.publicAccessBlock?.blockPublicPolicy === true;

    return {
      compliant: isPublicBlocked,
      violations: isPublicBlocked ? [] : [{
        policyId: 'AWS-S3-001',
        resourceId: resource.id,
        message: 'S3 bucket public access is not blocked',
        severity: 'CRITICAL',
        remediation: 'Enable S3 Block Public Access settings at the bucket level'
      }]
    };
  }
};

export const s3Encryption: Policy = {
  id: 'AWS-S3-002',
  name: 'S3 Encryption',
  description: 'S3 buckets must have default encryption enabled',
  severity: 'HIGH',
  category: 'cloud',
  enabled: true,
  evaluate: (resource: any): PolicyResult => {
    const hasEncryption = resource.encryption?.enabled === true;
    const validAlgorithm = resource.encryption?.algorithm === 'AES256' || 
                          resource.encryption?.algorithm === 'aws:kms';

    const isCompliant = hasEncryption && validAlgorithm;

    return {
      compliant: isCompliant,
      violations: isCompliant ? [] : [{
        policyId: 'AWS-S3-002',
        resourceId: resource.id,
        message: 'S3 bucket encryption is not properly configured',
        severity: 'HIGH',
        remediation: 'Enable default encryption using AES-256 or AWS KMS'
      }]
    };
  }
};