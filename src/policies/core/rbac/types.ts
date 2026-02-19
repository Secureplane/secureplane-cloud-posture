export type PolicyRole = 'viewer' | 'editor' | 'admin';

export interface PolicyPermission {
  read: boolean;
  write: boolean;
  approve: boolean;
}

export interface PolicyAccess {
  roles: PolicyRole[];
  permissions: PolicyPermission;
  resourceId: string;
}