export interface TaskHistory {
  entries: HistoryEntry[];
}

export interface HistoryEntry {
  executionId: string;
  status: 'completed' | 'failed';
  duration: number;
  error?: string;
  timestamp: Date;
}