import { CloudMisconfiguration, ComplianceResult } from './CloudTypes';

export interface CloudScanResult {
  provider: string;
  timestamp: Date;
  findings: CloudMisconfiguration[];
  compliance: ComplianceResult[];
  metadata: {
    scanDuration: number;
    resourcesScanned: number;
  };
}

export interface ScanOptions {
  includeCompliance: boolean;
  complianceFrameworks?: string[];
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}