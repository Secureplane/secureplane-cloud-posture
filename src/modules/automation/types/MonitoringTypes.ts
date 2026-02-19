export type TaskStatus = 'completed' | 'failed' | 'running' | 'scheduled';

export interface MonitoringMetrics {
  executionTime: number;
  status: TaskStatus;
  lastRun: Date;
  errorCount: number;
}

export interface TaskHealthCheck {
  taskId: string;
  healthy: boolean;
  lastCheck: Date;
  issues?: string[];
}