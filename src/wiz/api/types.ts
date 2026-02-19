export interface ApiConfig {
  endpoint: string;
  apiKey: string;
  apiSecret: string;
  timeout: number;
}

export interface ScanRequest {
  resourceId: string;
  scanType: 'vulnerability' | 'compliance' | 'identity';
  options?: Record<string, unknown>;
}

export interface ScanResponse {
  id: string;
  status: 'success' | 'failure';
  findings: Finding[];
  metadata: {
    startTime: Date;
    endTime: Date;
    duration: number;
  };
}

export interface Finding {
  id: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  remediation?: string;
  businessImpact?: string;
}