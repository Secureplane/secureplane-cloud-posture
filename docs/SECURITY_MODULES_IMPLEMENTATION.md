# Wiz CNAPP Security Modules Implementation Guide

## 1. CSPM Implementation

### Cloud Provider Configuration
```yaml
# config/cloud-providers.yaml
providers:
  aws:
    enabled: true
    regions: [us-east-1, us-west-2]
    services:
      - ec2
      - s3
      - rds
  azure:
    enabled: true
    subscriptions: [prod, dev]
    services:
      - compute
      - storage
      - database
```

### Security Policies
```typescript
// src/policies/cloud.ts
export const cloudSecurityPolicies = {
  storage: {
    encryption: true,
    publicAccess: false,
    logging: true
  },
  network: {
    defaultDeny: true,
    bastionRequired: true
  }
};
```

## 2. CWPP Configuration

### Workload Protection
```yaml
# config/workload-protection.yaml
runtime:
  monitoring:
    enabled: true
    interval: 60s
  protection:
    mode: prevent
    actions:
      - block
      - alert
```

### Container Security
```typescript
// src/security/containers.ts
export const containerSecurity = {
  scanning: {
    onBuild: true,
    onDeploy: true,
    periodic: true
  },
  enforcement: {
    blockUnsigned: true,
    requireSBOM: true
  }
};
```

## 3. DSPM Setup

### Data Classification
```yaml
# config/data-security.yaml
classification:
  enabled: true
  types:
    - pii
    - pci
    - phi
  actions:
    - label
    - encrypt
    - alert
```

### Access Controls
```typescript
// src/security/data-access.ts
export const dataAccessControls = {
  encryption: {
    atRest: true,
    inTransit: true
  },
  authentication: {
    mfa: true,
    roleBasedAccess: true
  }
};
```

## 4. IaC Security

### Template Scanning
```yaml
# config/iac-security.yaml
scanning:
  providers:
    - terraform
    - cloudformation
    - kubernetes
  checks:
    - security
    - compliance
    - best-practices
```

### Policy Enforcement
```typescript
// src/security/iac-policies.ts
export const iacPolicies = {
  terraform: {
    requireVersioning: true,
    enforceEncryption: true,
    requireTags: true
  },
  kubernetes: {
    requireLimits: true,
    enforceNetworkPolicies: true
  }
};
```

## 5. Identity Security

### Access Management
```yaml
# config/identity-security.yaml
identity:
  management:
    rotation: 90d
    mfa: required
    review: quarterly
  monitoring:
    activity: true
    anomalies: true
```

### Permission Controls
```typescript
// src/security/permissions.ts
export const permissionControls = {
  leastPrivilege: true,
  temporaryElevation: {
    maxDuration: 3600,
    approval: true
  },
  review: {
    schedule: '0 0 1 * *',
    approvers: ['security-team']
  }
};
```