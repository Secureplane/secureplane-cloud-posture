```typescript
export interface ApiEndpoint {
  id: string;
  url: string;
  method: HttpMethod;
  authentication?: AuthConfig;
  rateLimit?: RateLimitConfig;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface AuthConfig {
  type: 'jwt' | 'oauth2' | 'api-key';
  config: Record<string, any>;
}

export interface RateLimitConfig {
  requestsPerMinute: number;
  burstSize: number;
}

export interface ApiScanResult {
  endpointId: string;
  url: string;
  timestamp: Date;
  securityChecks: SecurityCheck[];
  metadata: {
    scanDuration: number;
    status: 'pending' | 'running' | 'completed' | 'failed';
  };
}
```