export interface PolicyAuditEvent {
  id: string;
  policyId: string;
  action: 'evaluate' | 'modify' | 'approve';
  timestamp: Date;
  userId: string;
  result: string;
  metadata?: Record<string, unknown>;
}

export interface AuditOptions {
  retention: number;
  detailed: boolean;
}