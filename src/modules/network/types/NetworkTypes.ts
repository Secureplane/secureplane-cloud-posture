export interface NetworkResource {
  id: string;
  type: string;
  configuration: any;
  connections: Connection[];
}

export interface Connection {
  source: string;
  destination: string;
  protocol: string;
  ports: number[];
}

export type ExposureType = 'public' | 'misconfiguration' | 'vulnerability' | 'none';

export interface ExposureDetails {
  resourceId: string;
  exposureType: ExposureType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  accessVector: string[];
  attackPaths: string[];
  remediationSteps: string[];
}

export interface NetworkExposure {
  resourceId: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  details: ExposureDetails;
}

export interface ExposureResult {
  exposures: NetworkExposure[];
  attackSurface: {
    publicEndpoints: number;
    vulnerableServices: number;
    riskScore: number;
  };
  recommendations: string[];
  metadata: {
    scannedResources: number;
    timestamp: Date;
  };
}