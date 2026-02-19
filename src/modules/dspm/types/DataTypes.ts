export type DataStoreType = 'database' | 'storage' | 'file-system' | 'data-warehouse';

export interface DataStoreScanResult {
  storeId: string;
  type: DataStoreType;
  timestamp: Date;
  classification: DataClassification;
  compliance: ComplianceCheck[];
  encryption: EncryptionStatus;
  metadata: {
    scanDuration: number;
    status: 'pending' | 'running' | 'completed' | 'failed';
  };
}

export interface EncryptionStatus {
  atRest: {
    enabled: boolean;
    algorithm: string;
    keyRotation: boolean;
  };
  inTransit: {
    enabled: boolean;
    protocol: string;
  };
  keyManagement: {
    provider: string;
    status: string;
  };
}

export interface DataAccess {
  principal: string;
  action: string;
  timestamp: Date;
  location: string;
}

export interface DataExposure {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  remediation: string;
}