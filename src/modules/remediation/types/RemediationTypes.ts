export interface RemediationGuide {
  findingId: string;
  title: string;
  description: string;
  severity: string;
  steps: RemediationStep[];
  metadata: {
    generated: Date;
    estimatedTime: number;
  };
}

export interface RemediationStep {
  order: number;
  title: string;
  description: string;
  command: string;
  validation: string;
}