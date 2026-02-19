export interface AutomationTask {
  id: string;
  type: 'compliance_scan' | 'risk_assessment' | 'report_generation';
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  config: Record<string, any>;
}

export interface Schedule {
  taskId: string;
  cron: string;
  nextRun: Date;
  enabled: boolean;
}

export interface TaskResult {
  taskId: string;
  status: 'completed' | 'failed';
  result?: any;
  error?: string;
  duration?: number;
  timestamp: Date;
}