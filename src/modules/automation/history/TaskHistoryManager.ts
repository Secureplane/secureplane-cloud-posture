import { Logger } from '../../../utils/Logger';
import { TaskHistory, HistoryEntry } from '../types/HistoryTypes';
import { TaskResult } from '../types/AutomationTypes';

export class TaskHistoryManager {
  private logger: Logger;
  private history: Map<string, TaskHistory>;

  constructor() {
    this.logger = new Logger('TaskHistoryManager');
    this.history = new Map();
  }

  async recordTaskExecution(result: TaskResult): Promise<void> {
    try {
      const entry = this.createHistoryEntry(result);
      await this.addToHistory(result.taskId, entry);
      await this.pruneOldEntries(result.taskId);
    } catch (error) {
      this.logger.error(`Failed to record task history: ${error.message}`);
      throw error;
    }
  }

  private createHistoryEntry(result: TaskResult): HistoryEntry {
    return {
      executionId: `exec-${Date.now()}`,
      status: result.status,
      duration: result.duration || 0,
      error: result.error,
      timestamp: result.timestamp
    };
  }

  private async addToHistory(taskId: string, entry: HistoryEntry): Promise<void> {
    const taskHistory = this.history.get(taskId) || { entries: [] };
    taskHistory.entries.unshift(entry);
    this.history.set(taskId, taskHistory);
  }

  private async pruneOldEntries(taskId: string): Promise<void> {
    const taskHistory = this.history.get(taskId);
    if (taskHistory && taskHistory.entries.length > 100) {
      taskHistory.entries = taskHistory.entries.slice(0, 100);
    }
  }
}