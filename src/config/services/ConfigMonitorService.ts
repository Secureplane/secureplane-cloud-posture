import { FSWatcher, watch } from 'fs';
import { LoggerService } from './LoggerService';
import { ConfigEventEmitter } from '../events/ConfigEventEmitter';
import { ConfigService } from './ConfigService';
import { ConfigBackupService } from './ConfigBackupService';

export class ConfigMonitorService {
  private watcher: FSWatcher | null = null;
  private logger: LoggerService;
  private configService: ConfigService;
  private configEventEmitter: ConfigEventEmitter;
  private backupService: ConfigBackupService;

  constructor(
    configService: ConfigService,
    configEventEmitter: ConfigEventEmitter,
    backupService: ConfigBackupService
  ) {
    this.logger = new LoggerService('ConfigMonitor');
    this.configService = configService;
    this.configEventEmitter = configEventEmitter;
    this.backupService = backupService;
  }

  startMonitoring(configPath: string): void {
    this.logger.info(`Starting configuration monitoring for ${configPath}`);
    
    this.watcher = watch(configPath, { persistent: true }, async (eventType, filename) => {
      if (eventType === 'change') {
        this.logger.info(`Configuration file changed: ${filename}`);
        
        try {
          await this.backupService.createBackup();
          await this.configService.reloadConfig();
          this.configEventEmitter.emit('configChanged', { timestamp: new Date() });
        } catch (error) {
          this.logger.error(`Error handling configuration change: ${error.message}`);
          this.configEventEmitter.emit('configError', { error });
        }
      }
    });
  }

  stopMonitoring(): void {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
      this.logger.info('Configuration monitoring stopped');
    }
  }
}