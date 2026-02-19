# OPA Policy Implementation Guide

## Overview
This directory contains the OPA (Open Policy Agent) policy implementations for the Wiz platform. The policies are written in Rego and compiled to WebAssembly for efficient evaluation.

## Structure
```
policies/opa/
├── aws/                  # AWS-specific policies
├── azure/                # Azure-specific policies
├── gcp/                  # GCP-specific policies
├── kubernetes/           # Kubernetes policies
├── compiler.ts           # Policy compiler
└── evaluator.ts         # Policy evaluator
```

## Writing Policies

1. Create a new .rego file in the appropriate provider directory
2. Define the policy package and rules
3. Add metadata for policy management
4. Write tests for the policy
5. Compile the policy to WASM

Example:
```rego
package wiz.aws.security_groups

# Policy rules here...

metadata = {
    "id": "AWS-SG-001",
    "severity": "HIGH",
    # ... other metadata
}
```

## Testing Policies

Run tests using:
```bash
npm run opa:test
```

## Compiling Policies

Compile policies to WASM:
```bash
npm run opa:compile
```

## Integration

Policies are automatically loaded and evaluated as part of the security scanning process. Results are included in security reports and alerts.