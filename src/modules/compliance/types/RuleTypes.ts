export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  evaluation: {
    status: 'pass' | 'fail';
    evidence: any;
  };
  remediation?: string;
}

export interface RuleMapping {
  ruleId: string;
  frameworkControl: string;
  status: 'pass' | 'fail';
  evidence: any;
  remediation?: string;
}