export interface ComplianceScore {
  overallScore: number;
  frameworkBreakdown: Record<string, number>;
  weakAreas: any[];
  trends: any;
  metadata: {
    lastUpdated: Date;
    totalControls: number;
    failedControls: number;
  };
}

export interface ComplianceData {
  controls: ComplianceControl[];
  framework: string;
  timestamp: Date;
}

export interface ComplianceControl {
  id: string;
  framework: string;
  status: 'pass' | 'fail';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  remediation?: string;
}