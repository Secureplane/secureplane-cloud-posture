export interface RiskAssessment {
  overallScore: number;
  findings: RiskFinding[];
  recommendations: string[];
}

export interface RiskFinding {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: RiskCategory;
  description: string;
  impact: string;
  remediation?: string;
}

export type RiskCategory = 
  | 'excessive_permissions'
  | 'unusual_access_pattern'
  | 'authentication_anomaly'
  | 'privilege_escalation'
  | 'compliance_violation';

export interface RiskMetrics {
  permissionComplexity: number;
  unusedPermissions: number;
  accessFrequency: number;
  authenticationFailures: number;
  complianceScore: number;
}