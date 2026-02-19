```markdown
# Wiz Terraform Run Tasks Integration Guide

## Overview

Wiz's integration with HashiCorp Terraform Cloud and Enterprise enables automated security scanning of Infrastructure as Code (IaC) during the Terraform workflow. This guide covers setup, configuration, and best practices.

## Prerequisites

- Terraform Cloud/Enterprise account
- Wiz API credentials
- Required permissions:
  - Terraform: Organization owner or team admin
  - Wiz: Service account with IaC scanning permissions

## Setup Process

### 1. Create Wiz Service Account

```bash
# Generate service account credentials
wiz-cli service-account create \
  --name "terraform-runtask" \
  --description "Terraform Run Tasks Integration" \
  --type "TERRAFORM_RUNTASK"
```

### 2. Configure Run Task

```hcl
# terraform/runtask.tf
resource "tfe_organization_run_task" "wiz_security" {
  name         = "wiz-security-scan"
  organization = var.organization
  url          = "https://api.wiz.io/terraform/runtask"
  enabled      = true
  
  hmac_key     = var.wiz_api_key
}
```

### 3. Workspace Configuration

```hcl
# Configure workspace to use run task
resource "tfe_workspace_run_task" "wiz_security" {
  workspace_id      = tfe_workspace.example.id
  task_id          = tfe_organization_run_task.wiz_security.id
  enforcement_level = "mandatory"
}
```

## Security Policies

### 1. Policy Configuration

```yaml
# config/terraform-policies.yaml
policies:
  - name: block-public-access
    description: Block public access to cloud resources
    severity: HIGH
    enforcement: mandatory
    rules:
      - resource_types: 
          - aws_s3_bucket
          - azure_storage_account
        conditions:
          - key: public_access
            operator: equals
            value: true
        action: block

  - name: require-encryption
    description: Require encryption for sensitive resources
    severity: HIGH
    enforcement: mandatory
    rules:
      - resource_types:
          - aws_ebs_volume
          - azure_managed_disk
        conditions:
          - key: encrypted
            operator: equals
            value: false
        action: block
```

### 2. Custom Policy Development

```typescript
// src/policies/custom-policy.ts
export const customPolicy = {
  name: 'custom-security-check',
  description: 'Custom security validation',
  validate: (resource: TerraformResource) => {
    // Custom validation logic
    return {
      valid: boolean,
      violations: string[]
    };
  }
};
```

## Integration Features

### 1. Security Scanning

- Pre-apply security validation
- Policy compliance checking
- Vulnerability detection
- Misconfiguration identification

### 2. Results Processing

```typescript
interface ScanResult {
  status: 'pass' | 'fail';
  findings: Finding[];
  metadata: {
    scanTime: Date;
    policySet: string[];
    enforcementLevel: string;
  };
}
```

### 3. Notification System

```yaml
# notification-config.yaml
notifications:
  slack:
    enabled: true
    channel: "#security-alerts"
    triggers:
      - policy_violation
      - scan_failure
  
  email:
    enabled: true
    recipients:
      - security-team@company.com
    triggers:
      - critical_finding
      - scan_completion
```

## Best Practices

### 1. Policy Management

1. Start with baseline policies
   - Resource encryption
   - Network security
   - Access controls
   - Compliance requirements

2. Policy Testing
   ```bash
   # Test policies against sample configurations
   npm run test:policies
   
   # Validate policy syntax
   npm run validate:policies
   ```

3. Version Control
   - Maintain policy versioning
   - Document policy changes
   - Review policy effectiveness

### 2. Security Implementation

1. Authentication
   - Use service accounts
   - Rotate credentials regularly
   - Implement least privilege

2. Network Security
   - Enable TLS/SSL
   - Implement IP allowlisting
   - Monitor API access

3. Compliance
   - Map policies to compliance requirements
   - Regular compliance audits
   - Documentation maintenance

### 3. Performance Optimization

1. Scan Optimization
   ```yaml
   # scanning-config.yaml
   optimization:
     parallel_scans: 5
     timeout: 300
     cache_results: true
     incremental_scanning: true
   ```

2. Resource Management
   ```yaml
   # resource-limits.yaml
   limits:
     cpu: "1"
     memory: "2Gi"
     concurrent_scans: 10
   ```

## Troubleshooting

### 1. Common Issues

1. Authentication Failures
   ```typescript
   // Check authentication status
   async checkAuth(): Promise<AuthStatus> {
     try {
       await client.validateCredentials();
       return { valid: true };
     } catch (error) {
       return { 
         valid: false, 
         error: error.message 
       };
     }
   }
   ```

2. Scan Failures
   ```yaml
   # Scan failure resolution steps
   resolution_steps:
     - verify_credentials
     - check_network
     - validate_configuration
     - review_logs
   ```

### 2. Logging and Monitoring

1. Log Collection
   ```bash
   # Collect run task logs
   npm run logs:collect -- --service terraform-runtask
   
   # Analyze scan results
   npm run scan:analyze
   ```

2. Metrics Tracking
   ```typescript
   interface RunTaskMetrics {
     scanDuration: number;
     findingsCount: number;
     policyViolations: number;
     resourcesScanned: number;
   }
   ```

## Support and Maintenance

### 1. Regular Maintenance

1. Update Schedule
   ```yaml
   maintenance:
     policy_review: monthly
     credential_rotation: quarterly
     performance_analysis: weekly
   ```

2. Backup Procedures
   ```bash
   # Backup configuration
   npm run backup:config
   
   # Export policies
   npm run export:policies
   ```

### 2. Support Resources

1. Documentation
   - Implementation guide
   - API reference
   - Policy catalog
   - Troubleshooting guide

2. Support Channels
   - Technical support portal
   - Community forums
   - Documentation repository
   - Training resources
```