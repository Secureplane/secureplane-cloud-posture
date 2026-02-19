export interface ContainerImage {
  id: string;
  name: string;
  tag: string;
  digest: string;
  size: number;
  layers: ImageLayer[];
}

export interface ImageLayer {
  digest: string;
  size: number;
  command: string;
}

export interface ContainerScanResult {
  imageId: string;
  name: string;
  tag: string;
  timestamp: Date;
  vulnerabilities: Vulnerability[];
  compliance: ComplianceResult[];
  configIssues: ConfigIssue[];
  metadata: {
    scanDuration: number;
    status: 'pending' | 'running' | 'completed' | 'failed';
    businessContext?: {
      criticalityScore: number;
      dataClassification: string;
      serviceOwner: string;
    };
  };
}

export interface Vulnerability {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  package: string;
  version: string;
  fixedVersion?: string;
  description: string;
  remediation?: string;
  businessImpact?: string;
  attackVector?: string;
  exploitability?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ComplianceResult {
  standard: string;
  control: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  description: string;
  evidence?: string;
  impact?: string;
}

export interface ConfigIssue {
  type: 'security' | 'best-practice';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  context: string;
  remediation: string;
  businessImpact?: string;
}