export interface TaskError {
  id: string;
  taskId: string;
  message: string;
  context: ErrorContext;
  timestamp: Date;
}

export interface ErrorContext {
  taskType: string;
  executionTime: number;
  stackTrace?: string;
  systemState: Record<string, any>;
}