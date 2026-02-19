package wiz.core.security.access

import future.keywords

default result = "pass"

# Check password policy
result = "fail" if {
    input.passwordPolicy.minLength < 12
}

# Check MFA requirement
result = "fail" if {
    not input.mfaEnabled
}

# Check session timeout
result = "fail" if {
    input.sessionTimeout > 28800  # 8 hours in seconds
}

metadata = {
    "id": "SEC-ACCESS-001",
    "title": "Access Control Security",
    "description": "Enforces access control security requirements",
    "severity": "CRITICAL",
    "category": "security",
    "framework": ["CIS", "NIST"]
}