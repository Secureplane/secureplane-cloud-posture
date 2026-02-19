export interface HeaderConfig {
  requiredHeaders: string[];
  cors: {
    allowedOrigins: string[];
    allowedMethods: string[];
  };
}

export interface HeaderScanResult {
  requiredHeaders: any;
  cors: any;
  contentSecurity: any;
  timestamp: Date;
}