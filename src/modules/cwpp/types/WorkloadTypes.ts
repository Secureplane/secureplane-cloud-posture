export type WorkloadType = 'container' | 'serverless' | 'vm';

export interface WorkloadScanResult {
  workloadId: string;
  type: WorkloadType;
  timestamp: Date;
  vulnerabilities: WorkloadVulnerability[];
  runtime: RuntimeCheck;
  metadata: {
    scanDuration: number;
    status: 'pending' | 'running' | 'completed' | 'failed';
  };
}

export interface WorkloadVulnerability {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  affected: string;
  remediation?: string;
}

export interface RuntimeCheck {
  processes: ProcessCheck[];
  network: NetworkCheck[];
  filesystem: FilesystemCheck[];
}

export interface ProcessCheck {
  pid: number;
  name: string;
  status: 'normal' | 'suspicious';
}

export interface NetworkCheck {
  port: number;
  protocol: string;
  status: 'normal' | 'suspicious';
}

export interface FilesystemCheck {
  path: string;
  permissions: string;
  status: 'normal' | 'suspicious';
}