export type CloudProvider = 'aws' | 'azure' | 'gcp';

export interface CloudResource {
  id: string;
  type: string;
  name: string;
  provider: CloudProvider;
  region: string;
  tags: Record<string, string>;
}

export interface CloudMisconfiguration {
  resourceId: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  remediation: string;
}

export interface ComplianceResult {
  framework: string;
  status: 'COMPLIANT' | 'NON_COMPLIANT';
  violations: ComplianceViolation[];
}

export interface ComplianceViolation {
  control: string;
  severity: string;
  description: string;
  resourceId: string;
}