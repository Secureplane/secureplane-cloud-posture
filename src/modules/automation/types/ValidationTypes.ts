export interface ValidationResult {
  valid: boolean;
  errors: string[];
  timestamp: Date;
}

export interface ValidationRule {
  id: string;
  name: string;
  validate: (value: any) => Promise<boolean>;
  errorMessage: string;
}