import { Logger } from '../../../utils/Logger';
import { TaskResult } from '../types/AutomationTypes';
import { ComplianceScanner } from '../../compliance/ComplianceScanner';

export class TaskRunner {
  private logger: Logger;
  private scanner: ComplianceScanner;

  constructor() {
    this.logger = new Logger('TaskRunner');
    this.scanner = new ComplianceScanner();
  }

  async execute(taskId: string): Promise<TaskResult> {
    try {
      const startTime = Date.now();
      const result = await this.scanner.scan();

      return {
        taskId,
        status: 'completed',
        result,
        duration: Date.now() - startTime,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        taskId,
        status: 'failed',
        error: error.message,
        timestamp: new Date()
      };
    }
  }
}