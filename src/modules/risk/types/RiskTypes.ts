export interface RiskNode {
  id: string;
  type: 'vulnerability' | 'misconfiguration' | 'identity';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  connections: string[];
}

export interface RiskPath {
  id: string;
  nodes: RiskNode[];
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  impact: string;
}

export interface CorrelationResult {
  attackPaths: RiskPath[];
  criticalPaths: RiskPath[];
  riskScore: number;
  timestamp: Date;
}