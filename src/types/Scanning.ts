export interface ScanResult {
  timestamp: Date;
  type: 'cspm' | 'cwpp' | 'dspm';
  findings: any[];
  metadata: {
    scanDuration: number;
    resourcesScanned: number;
  };
}

export interface Finding {
  id: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  remediation?: string;
}