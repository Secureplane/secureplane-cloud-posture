export interface ComplianceData {
  findings: Finding[];
  framework: string;
  timestamp: Date;
}

export interface Finding {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  control: string;
}

export interface ExecutiveReport {
  summary: {
    overallScore: number;
    criticalIssues: number;
    complianceStatus: string;
  };
  riskOverview: any;
  recommendations: string[];
  timestamp: Date;
}

export interface DetailedReport {
  findings: Finding[];
  analysis: any;
  remediation: any;
  metadata: {
    generated: Date;
    framework: string;
  };
}