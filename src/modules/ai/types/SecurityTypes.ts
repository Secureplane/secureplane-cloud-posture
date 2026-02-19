export interface SecurityContext {
  environment: string;
  resourceType: string;
  alertType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: Date;
  metadata: Record<string, any>;
}

export interface AIAnalysis {
  summary: string;
  severity: string;
  impact: {
    technical: string;
    business: string;
  };
  recommendations: string[];
  context: Record<string, any>;
}

export interface RemediationPlan {
  steps: RemediationStep[];
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  estimatedEffort: string;
  automation: {
    possible: boolean;
    tools?: string[];
    script?: string;
  };
}

export interface RemediationStep {
  order: number;
  description: string;
  command?: string;
  validation?: string;
  rollback?: string;
}

export interface SecurityInsight {
  riskAnalysis: {
    level: string;
    factors: string[];
  };
  businessImpact: {
    severity: string;
    areas: string[];
  };
  trendAnalysis: {
    pattern: string;
    frequency: string;
  };
  recommendations: string[];
}