export interface ComplianceCheck {
  framework: string;
  status: 'COMPLIANT' | 'NON_COMPLIANT';
  findings: ComplianceFinding[];
}

export interface ComplianceFinding {
  control: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  description: string;
  remediation?: string;
}

export interface ComplianceRequirement {
  id: string;
  framework: string;
  control: string;
  description: string;
  validation: string[];
}

export interface ComplianceEvidence {
  requirementId: string;
  timestamp: Date;
  status: 'COMPLIANT' | 'NON_COMPLIANT';
  details: string;
  artifacts: string[];
}