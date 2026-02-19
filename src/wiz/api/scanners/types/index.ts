import { Finding } from '../../types';

export interface ApiScanOptions {
  includeSwagger: boolean;
  depth: 'basic' | 'full';
  timeout?: number;
  scanTypes?: ApiScanType[];
}

export type ApiScanType = 
  | 'authentication'
  | 'authorization'
  | 'data_validation'
  | 'rate_limiting'
  | 'security_headers';

export interface ApiScanResult {
  findings: Finding[];
  metadata: {
    scanTime: Date;
    duration: number;
    scannedEndpoints: string[];
  };
  recommendations: ApiRecommendation[];
}

export interface ApiRecommendation {
  findingId: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
  remediation: string;
}