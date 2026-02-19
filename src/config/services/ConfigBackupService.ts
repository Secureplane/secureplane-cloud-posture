import { copyFile } from 'fs/promises';
import { join } from 'path';
import { LoggerService } from './LoggerService';

export class ConfigBackupService {
  private logger: LoggerService;
  private backupDir: string;
  private maxBackups: number;

  constructor(backupDir: string = './config/backups', maxBackups: number = 10) {
    this.logger = new LoggerService('ConfigBackup');
    this.backupDir = backupDir;
    this.maxBackups = maxBackups;
  }

  async createBackup(): Promise<void> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = join(this.backupDir, `wiz.config.${timestamp}.yaml`);
      
      await copyFile('./config/wiz.yaml', backupPath);
      this.logger.info(`Configuration backup created: ${backupPath}`);
      
      await this.cleanOldBackups();
    } catch (error) {
      this.logger.error(`Backup creation failed: ${error.message}`);
      throw error;
    }
  }

  private async cleanOldBackups(): Promise<void> {
    // Implementation for cleaning old backups
    // This would remove the oldest backups when exceeding maxBackups
  }
}