import { Logger } from '../../../utils/Logger';
import { AutomationTask } from '../types/AutomationTypes';
import { ValidationResult } from '../types/ValidationTypes';

export class TaskValidator {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('TaskValidator');
  }

  async validateTask(task: AutomationTask): Promise<ValidationResult> {
    try {
      const checks = await Promise.all([
        this.validateConfiguration(task),
        this.validateSchedule(task),
        this.validateDependencies(task)
      ]);

      return {
        valid: checks.every(check => check.valid),
        errors: checks.flatMap(check => check.errors || []),
        timestamp: new Date()
      };
    } catch (error) {
      this.logger.error(`Task validation failed: ${error.message}`);
      throw error;
    }
  }

  private async validateConfiguration(task: AutomationTask): Promise<ValidationResult> {
    const errors = [];
    if (!task.config) errors.push('Missing task configuration');
    if (!task.type) errors.push('Missing task type');
    if (!task.frequency) errors.push('Missing task frequency');

    return {
      valid: errors.length === 0,
      errors,
      timestamp: new Date()
    };
  }

  private async validateSchedule(task: AutomationTask): Promise<ValidationResult> {
    const validFrequencies = ['hourly', 'daily', 'weekly', 'monthly'];
    return {
      valid: validFrequencies.includes(task.frequency),
      errors: validFrequencies.includes(task.frequency) ? [] : ['Invalid frequency'],
      timestamp: new Date()
    };
  }

  private async validateDependencies(task: AutomationTask): Promise<ValidationResult> {
    // Implement dependency validation
    return {
      valid: true,
      errors: [],
      timestamp: new Date()
    };
  }
}