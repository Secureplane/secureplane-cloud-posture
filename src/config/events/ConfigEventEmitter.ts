import { EventEmitter } from 'events';
import { LoggerService } from '../services/LoggerService';

export interface ConfigChangeEvent {
  timestamp: Date;
}

export interface ConfigErrorEvent {
  error: Error;
}

export class ConfigEventEmitter extends EventEmitter {
  private logger: LoggerService;

  constructor() {
    super();
    this.logger = new LoggerService('ConfigEvents');
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.on('configChanged', (event: ConfigChangeEvent) => {
      this.logger.info(`Configuration changed at ${event.timestamp.toISOString()}`);
    });

    this.on('configError', (event: ConfigErrorEvent) => {
      this.logger.error(`Configuration error: ${event.error.message}`);
    });
  }
}