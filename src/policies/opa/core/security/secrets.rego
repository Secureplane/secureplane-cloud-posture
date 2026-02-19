package wiz.core.security.secrets

import future.keywords

default result = "pass"

# Check for hardcoded secrets
result = "fail" if {
    some secret in input.codeAnalysis.secrets
    secret.type in ["API_KEY", "PASSWORD", "TOKEN"]
}

# Check secrets encryption
result = "fail" if {
    not input.secretsManagement.encryption.enabled
}

# Check secrets rotation
result = "fail" if {
    some secret in input.secretsManagement.secrets
    secret.lastRotated < (time.now_ns() - (90 * 24 * 60 * 60 * 1000000000))  # 90 days
}

metadata = {
    "id": "SEC-SECRETS-001",
    "title": "Secrets Management",
    "description": "Enforces secure secrets management practices",
    "severity": "CRITICAL",
    "category": "security",
    "framework": ["CIS", "NIST", "PCI-DSS"]
}