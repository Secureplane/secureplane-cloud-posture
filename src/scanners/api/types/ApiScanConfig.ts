import { AuthConfig } from './AuthTypes';
import { ValidationConfig } from './ValidationTypes';
import { HeaderConfig } from './HeaderTypes';

export interface ApiScanConfig {
  auth: AuthConfig;
  validation: ValidationConfig;
  headers: HeaderConfig;
}