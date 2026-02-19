export interface AssessmentConfig {
  assessmentInterval: number; // Interval in seconds
  frameworks: string[]; // Framework IDs to assess
  alerting: {
    enabled: boolean;
    threshold: number;
  };
}

export interface ComplianceFramework {
  id: string;
  name: string;
  version: string;
  controls: Control[];
}

export interface Control {
  id: string;
  name: string;
  description: string;
  requirements?: string[];
  validation?: any;
}

export interface AssessmentResult {
  frameworkId: string;
  frameworkName: string;
  controls: ControlResult[];
  score: number;
  timestamp: Date;
  duration: number;
}

export interface ControlResult {
  controlId: string;
  status: 'pass' | 'fail';
  evidence: any;
  timestamp: Date;
}