export interface RetryConfig {
  enabled: boolean;
  maxAttempts: number;
  backoffMultiplier: number;
  initialDelay: number;
}

export interface RetryAttempt {
  timestamp: Date;
  error?: string;
  attemptNumber: number;
}