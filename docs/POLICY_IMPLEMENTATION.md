# Wiz CNAPP Policy Implementation Guide

## Overview

The Wiz Cloud Native Application Protection Platform (CNAPP) implements a comprehensive policy framework using Open Policy Agent (OPA) and Rego. This document details the implementation, organization, and best practices for policy management.

## Policy Architecture

### 1. Framework Organization

```
policies/
├── frameworks/           # Compliance framework implementations
│   ├── nist/            # NIST 800-53 controls
│   │   ├── ac/          # Access Control
│   │   ├── au/          # Audit and Accountability
│   │   ├── cm/          # Configuration Management
│   │   └── si/          # System Integrity
│   └── iso/             # ISO 27001 controls
│       ├── a5/          # Information Security Policies
│       ├── a8/          # Asset Management
│       ├── a9/          # Access Control
│       └── a10/         # Cryptography
├── providers/           # Cloud provider-specific policies
│   ├── aws/            # AWS security policies
│   ├── azure/          # Azure security policies
│   └── gcp/            # GCP security policies
└── core/               # Core security policies
    ├── security/       # Security fundamentals
    ├── compliance/     # Compliance requirements
    └── governance/     # Governance controls
```

### 2. Policy Components

Each policy consists of:

```rego
package wiz.domain

# Metadata
metadata = {
    "id": "POLICY-ID",
    "title": "Policy Title",
    "description": "Policy Description",
    "severity": "HIGH",
    "category": "security",
    "framework": ["NIST", "ISO27001"],
    "controls": ["AC-2", "AC-3"]
}

# Rules
default result = "pass"

# Violation conditions
result = "fail" if {
    violation_condition
}

# Helper functions
check_condition(input) {
    # Implementation
}
```

## NIST 800-53 Implementation

### 1. Access Control (AC)

#### AC-5: Separation of Duties
```rego
# Checks for separation of duties
result = "fail" if {
    some role in input.roles
    has_conflicting_duties(role)
}
```

#### AC-6: Least Privilege
```rego
# Enforces least privilege principle
result = "fail" if {
    some user in input.users
    has_excessive_privileges(user)
}
```

### 2. Audit and Accountability (AU)

#### AU-2: Audit Events
```rego
# Validates audit event capture
result = "fail" if {
    not input.auditConfig.enabled
}
```

#### AU-6: Audit Review
```rego
# Ensures audit review processes
result = "fail" if {
    not input.auditConfig.review.enabled
}
```

## ISO 27001 Implementation

### 1. Information Security Policies (A.5)

```rego
# Validates policy documentation
result = "fail" if {
    not input.securityPolicies.documented
}
```

### 2. Access Control (A.9)

```rego
# Checks access control implementation
result = "fail" if {
    not meets_access_requirements(input.accessControl)
}
```

## Cloud Provider Policies

### 1. AWS Security

#### IAM Policies
```rego
# Checks IAM configuration
result = "fail" if {
    some user in input.users
    has_admin_privileges(user)
}
```

#### S3 Security
```rego
# Validates S3 bucket security
result = "fail" if {
    some bucket in input.buckets
    is_public(bucket)
}
```

### 2. Azure Security

#### Key Vault Security
```rego
# Ensures Key Vault security
result = "fail" if {
    not input.properties.enableSoftDelete
}
```

## Policy Evaluation

### 1. Runtime Evaluation

```typescript
class PolicyEvaluator {
    async evaluatePolicy(policy: Policy, input: any): Promise<Result> {
        // Policy evaluation implementation
    }
}
```

### 2. Performance Optimization

- Policy compilation to WASM
- Caching mechanisms
- Incremental evaluation
- Parallel processing

## Integration Points

### 1. CI/CD Integration

```yaml
# GitLab CI configuration
policy_check:
  stage: security
  script:
    - wiz policy evaluate
```

### 2. Kubernetes Integration

```yaml
# Admission Controller
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: wiz-policy-validator
```

## Best Practices

### 1. Policy Development

- Use clear, descriptive package names
- Include comprehensive metadata
- Implement helper functions
- Add detailed comments

### 2. Testing

```typescript
describe('Policy Tests', () => {
    test('should detect violations', async () => {
        const result = await evaluator.evaluate(policy, input);
        expect(result.violations).toHaveLength(1);
    });
});
```

### 3. Maintenance

- Regular policy reviews
- Framework updates
- Performance optimization
- Documentation updates

## Troubleshooting

### 1. Common Issues

- Policy compilation errors
- Evaluation timeouts
- Resource constraints
- Integration failures

### 2. Resolution Steps

1. Validate policy syntax
2. Check input data
3. Review logs
4. Test in isolation

## Appendix

### A. Policy Metadata Schema

```typescript
interface PolicyMetadata {
    id: string;
    title: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    category: string;
    framework: string[];
    controls?: string[];
}
```

### B. Supported Frameworks

- NIST 800-53
- ISO 27001
- CIS Benchmarks
- PCI DSS
- HIPAA