import { Severity } from '../../types/common';

export interface Policy {
  id: string;
  name: string;
  description: string;
  severity: Severity;
  category: PolicyCategory;
  enabled: boolean;
  evaluate: (resource: any) => PolicyResult;
}

export interface PolicyResult {
  compliant: boolean;
  violations: PolicyViolation[];
}

export interface PolicyViolation {
  policyId: string;
  resourceId: string;
  message: string;
  severity: Severity;
  remediation?: string;
}

export type PolicyCategory = 
  | 'security'
  | 'compliance'
  | 'governance'
  | 'cloud'
  | 'framework';

export interface ComplianceFramework {
  id: string;
  name: string;
  version: string;
  controls: ComplianceControl[];
}

export interface ComplianceControl {
  id: string;
  name: string;
  description: string;
  policies: Policy[];
}