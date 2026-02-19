import { Logger } from '../utils/logger';

interface BuildMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  steps: BuildStep[];
  status: 'success' | 'failure';
  errors?: string[];
}

interface BuildStep {
  name: string;
  startTime: number;
  endTime: number;
  duration: number;
  status: 'success' | 'failure';
}

export class BuildMonitor {
  private logger: Logger;
  private currentBuild: BuildMetrics;
  private steps: Map<string, BuildStep>;

  constructor() {
    this.logger = new Logger();
    this.steps = new Map();
    this.currentBuild = this.initializeBuild();
  }

  startBuild(): void {
    this.currentBuild = this.initializeBuild();
    this.logger.info(`Build started at ${new Date(this.currentBuild.startTime).toISOString()}`);
  }

  startStep(stepName: string): void {
    const step: BuildStep = {
      name: stepName,
      startTime: Date.now(),
      endTime: 0,
      duration: 0,
      status: 'success'
    };
    this.steps.set(stepName, step);
    this.logger.info(`Step "${stepName}" started`);
  }

  endStep(stepName: string, status: 'success' | 'failure' = 'success'): void {
    const step = this.steps.get(stepName);
    if (step) {
      step.endTime = Date.now();
      step.duration = step.endTime - step.startTime;
      step.status = status;
      this.currentBuild.steps.push(step);
      this.logger.info(`Step "${stepName}" completed in ${step.duration}ms`);
    }
  }

  endBuild(status: 'success' | 'failure' = 'success', errors: string[] = []): BuildMetrics {
    this.currentBuild.endTime = Date.now();
    this.currentBuild.duration = this.currentBuild.endTime - this.currentBuild.startTime;
    this.currentBuild.status = status;
    this.currentBuild.errors = errors;

    this.logger.info(`Build completed in ${this.currentBuild.duration}ms`);
    if (status === 'failure') {
      errors.forEach(error => this.logger.error(`Build error: ${error}`));
    }

    return this.currentBuild;
  }

  private initializeBuild(): BuildMetrics {
    return {
      startTime: Date.now(),
      endTime: 0,
      duration: 0,
      steps: [],
      status: 'success'
    };
  }
}