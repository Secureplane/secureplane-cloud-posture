import { WizConfig } from '../types/ConfigTypes';

export interface IConfigService {
  loadConfig(path: string): Promise<WizConfig>;
  getConfig(): WizConfig;
  reloadConfig(): Promise<WizConfig>;
  validateConfig(config: WizConfig): Promise<boolean>;
}