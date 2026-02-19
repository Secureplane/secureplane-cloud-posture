export interface ScannerConfig {
  scanning?: {
    interval: number;
    enabled: boolean;
    types: string[];
  };
  compliance?: {
    frameworks: string[];
    enabled: boolean;
  };
  reporting?: {
    format: string;
    destination: string;
  };
}

export interface Vulnerability {
  id: string;
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  remediation?: string;
}

export interface ScanResult {
  timestamp: Date;
  scanner: string;
  vulnerabilities: Vulnerability[];
  compliance: {
    status: string;
    violations: string[];
  };
  metadata: {
    duration: number;
    resourcesScanned: number;
  };
}