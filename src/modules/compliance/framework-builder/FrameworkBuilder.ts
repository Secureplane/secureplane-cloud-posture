import { Logger } from '../../../utils/Logger';
import { ComplianceFramework, FrameworkConfig } from '../types/FrameworkTypes';

export class FrameworkBuilder {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('FrameworkBuilder');
  }

  async createFramework(config: FrameworkConfig): Promise<ComplianceFramework> {
    try {
      this.logger.info(`Creating new compliance framework: ${config.name}`);
      
      return {
        id: this.generateFrameworkId(),
        name: config.name,
        description: config.description,
        controls: config.controls.map(control => ({
          id: control.id,
          name: control.name,
          description: control.description,
          requirements: control.requirements,
          validation: control.validation
        })),
        metadata: {
          created: new Date(),
          version: '1.0.0',
          owner: config.owner
        }
      };
    } catch (error) {
      this.logger.error(`Failed to create framework: ${error.message}`);
      throw error;
    }
  }

  private generateFrameworkId(): string {
    return `framework-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}