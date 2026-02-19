export interface Project {
  id: string;
  name: string;
  config: any;
  metrics: ProjectMetrics;
  created: Date;
}

export interface ProjectMetrics {
  complianceScore: number;
  criticalIssues: number;
  lastUpdated: Date;
}