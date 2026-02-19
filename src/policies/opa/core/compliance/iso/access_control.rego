package wiz.core.compliance.iso.ac

import future.keywords

default result = "pass"

# ISO 27001 A.9: Access Control
result = "fail" if {
    not input.accessControl.policy.exists
}

result = "fail" if {
    not input.accessControl.userRegistration.formal
}

# Check password policy
result = "fail" if {
    not meets_password_requirements(input.accessControl.passwordPolicy)
}

# Helper function for password requirements
meets_password_requirements(policy) {
    policy.minLength >= 12
    policy.complexity
    policy.history >= 4
    policy.maxAge <= 90
}

metadata = {
    "id": "ISO-AC-001",
    "title": "ISO Access Control",
    "description": "Implements ISO 27001 Access Control requirements",
    "severity": "HIGH",
    "category": "compliance",
    "framework": ["ISO 27001"]
}