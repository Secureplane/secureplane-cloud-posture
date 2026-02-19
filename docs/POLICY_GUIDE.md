# Wiz CNAPP Policy Implementation Guide

## Overview

This comprehensive guide details the policy implementation in the Wiz Cloud Native Application Protection Platform (CNAPP). Our policy framework leverages Open Policy Agent (OPA) and Rego to provide complete coverage across cloud environments, Kubernetes setups, and compliance frameworks.

## Policy Architecture

### 1. Framework Organization

The policy framework is organized into a hierarchical structure that promotes modularity and reusability:

```
src/policies/opa/
├── frameworks/           # Framework-specific implementations
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

Each policy is structured with the following components:

```rego
package wiz.domain

# Metadata provides context and classification
metadata = {
    "id": "POLICY-ID",
    "title": "Policy Title",
    "description": "Detailed policy description",
    "severity": "HIGH",
    "category": "security",
    "framework": ["NIST", "ISO27001"],
    "controls": ["AC-2", "AC-3"],
    "provider": "aws",  # If provider-specific
    "remediation": "Step-by-step remediation guidance"
}

# Default policy result
default result = "pass"

# Violation conditions
result = "fail" if {
    violation_condition
}

# Helper functions for complex checks
check_condition(input) {
    # Implementation
}
```

## Compliance Framework Implementation

### 1. NIST 800-53 Controls

#### Access Control (AC)

```rego
# AC-5: Separation of Duties
package wiz.nist.ac5

result = "fail" if {
    some role in input.roles
    has_conflicting_duties(role)
}

# AC-6: Least Privilege
package wiz.nist.ac6

result = "fail" if {
    some user in input.users
    has_excessive_privileges(user)
}
```

#### Audit and Accountability (AU)

```rego
# AU-2: Audit Events
package wiz.nist.au2

result = "fail" if {
    not input.auditConfig.enabled
}

# AU-6: Audit Review
package wiz.nist.au6

result = "fail" if {
    not input.auditConfig.review.enabled
}
```

### 2. ISO 27001 Controls

#### Information Security Policies (A.5)

```rego
package wiz.iso.a5

result = "fail" if {
    not input.securityPolicies.documented
}
```

#### Access Control (A.9)

```rego
package wiz.iso.a9

result = "fail" if {
    not meets_access_requirements(input.accessControl)
}
```

## Cloud Provider Security Policies

### 1. AWS Security Policies

#### IAM Security

```rego
package wiz.aws.iam

# Check for IAM users with admin privileges
result = "fail" if {
    some user in input.users
    has_admin_privileges(user)
}

# Check for access key rotation
result = "fail" if {
    some user in input.users
    some key in user.access_keys
    key_age_days(key) > 90
}
```

#### S3 Security

```rego
package wiz.aws.s3

# Check for public S3 buckets
result = "fail" if {
    some bucket in input.buckets
    is_public(bucket)
}

# Check for encryption
result = "fail" if {
    some bucket in input.buckets
    not has_encryption(bucket)
}
```

### 2. Azure Security Policies

#### Key Vault Security

```rego
package wiz.azure.keyvault

# Check for soft delete
result = "fail" if {
    not input.properties.enableSoftDelete
}

# Check for network access
result = "fail" if {
    input.properties.networkAcls.defaultAction == "Allow"
}
```

## Policy Evaluation Process

### 1. Runtime Evaluation

The policy evaluation process follows these steps:

1. Policy Loading
```typescript
class PolicyLoader {
    async loadPolicies(): Promise<void> {
        // Load and compile policies
    }
}
```

2. Input Processing
```typescript
class InputProcessor {
    async processInput(rawInput: any): Promise<ProcessedInput> {
        // Process and validate input
    }
}
```

3. Evaluation
```typescript
class PolicyEvaluator {
    async evaluate(policy: Policy, input: ProcessedInput): Promise<Result> {
        // Evaluate policy against input
    }
}
```

### 2. Performance Optimization

The following optimizations are implemented:

1. Policy Compilation
- Policies are compiled to WebAssembly
- Cached for repeated evaluation
- Incrementally updated

2. Parallel Processing
- Concurrent policy evaluation
- Batched processing
- Resource pooling

## Integration Points

### 1. CI/CD Integration

```yaml
# GitLab CI example
security_scan:
  stage: security
  script:
    - wiz policy evaluate --framework nist
    - wiz policy evaluate --provider aws
```

### 2. Kubernetes Integration

```yaml
# Admission Controller
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: wiz-policy-validator
webhooks:
  - name: policy.wiz.io
    rules:
      - apiGroups: ["*"]
        apiVersions: ["*"]
        operations: ["CREATE", "UPDATE"]
        resources: ["*"]
```

## Best Practices

### 1. Policy Development

1. Naming Conventions
- Use clear, descriptive package names
- Follow domain-based organization
- Use consistent naming patterns

2. Documentation
- Include comprehensive metadata
- Document helper functions
- Provide usage examples

3. Testing
- Write unit tests
- Include edge cases
- Test framework compliance

### 2. Policy Maintenance

1. Regular Reviews
- Quarterly policy updates
- Framework alignment checks
- Performance optimization

2. Version Control
- Policy versioning
- Change documentation
- Deprecation process

## Troubleshooting Guide

### 1. Common Issues

1. Policy Compilation
- Syntax errors
- Invalid references
- Missing dependencies

2. Evaluation Issues
- Timeout errors
- Resource constraints
- Input validation failures

### 2. Resolution Steps

1. Compilation Issues
```bash
# Validate policy syntax
opa check policy.rego

# Test policy
opa test policy_test.rego
```

2. Runtime Issues
```bash
# Enable debug logging
export OPA_LOG_LEVEL=debug

# Profile policy evaluation
opa eval --profile policy.rego
```

## Appendix

### A. Policy Metadata Schema

```typescript
interface PolicyMetadata {
    id: string;                // Unique identifier
    title: string;            // Human-readable title
    description: string;      // Detailed description
    severity: Severity;       // Impact severity
    category: Category;       // Policy category
    framework: string[];      // Compliance frameworks
    controls?: string[];      // Specific controls
    provider?: string;        // Cloud provider
    remediation?: string;     // Remediation steps
}

type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
type Category = 'security' | 'compliance' | 'governance';
```

### B. Supported Frameworks

1. Regulatory Compliance
- NIST 800-53
- ISO 27001
- PCI DSS
- HIPAA
- GDPR

2. Security Standards
- CIS Benchmarks
- OWASP Top 10
- Cloud Provider Best Practices

### C. Testing Framework

```typescript
describe('Policy Tests', () => {
    test('should detect violations', async () => {
        const result = await evaluator.evaluate(policy, input);
        expect(result.violations).toHaveLength(1);
    });

    test('should provide remediation', async () => {
        const result = await evaluator.evaluate(policy, input);
        expect(result.remediation).toBeDefined();
    });
});
```