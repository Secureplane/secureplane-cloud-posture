export interface ValidationConfig {
  inputValidation: boolean;
  outputValidation: boolean;
  schemaValidation: boolean;
}

export interface ValidationResult {
  inputValidation: any;
  outputValidation: any;
  schemaValidation: any;
  timestamp: Date;
}