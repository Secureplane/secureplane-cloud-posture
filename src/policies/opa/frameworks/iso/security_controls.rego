package wiz.frameworks.iso.controls

import future.keywords
import data.wiz.core.security.encryption
import data.wiz.core.security.access

default result = "pass"

# A.5 Information Security Policies
result = "fail" if {
    not input.securityPolicies.documented
}

result = "fail" if {
    not input.securityPolicies.reviewed
}

# A.6 Organization of Information Security
result = "fail" if {
    not input.securityRoles.defined
}

# A.7 Human Resource Security
result = "fail" if {
    not input.employeeScreening.enabled
}

# A.8 Asset Management
result = "fail" if {
    not input.assetManagement.inventory.exists
}

result = "fail" if {
    input.assetManagement.inventory.lastUpdate < (time.now_ns() - (90 * 24 * 60 * 60 * 1000000000))
}

# A.9 Access Control
result = "fail" if {
    not meets_access_requirements(input.accessControl)
}

# A.10 Cryptography
result = "fail" if {
    not meets_crypto_requirements(input.cryptography)
}

# Helper functions
meets_access_requirements(access) {
    access.policy.exists
    access.userRegistration.formal
    meets_password_requirements(access.passwordPolicy)
}

meets_password_requirements(policy) {
    policy.minLength >= 12
    policy.complexity
    policy.history >= 4
    policy.maxAge <= 90
}

meets_crypto_requirements(crypto) {
    crypto.policy.exists
    crypto.keyManagement.exists
    all_algorithms_approved(crypto.algorithms)
}

all_algorithms_approved(algorithms) {
    approved = ["AES-256-GCM", "RSA-4096", "ECDSA-P384"]
    all(algorithm | algorithms[_] == algorithm; algorithm in approved)
}

metadata = {
    "id": "ISO-CONTROLS-001",
    "title": "ISO 27001 Security Controls",
    "description": "Comprehensive ISO 27001 security controls implementation",
    "severity": "HIGH",
    "category": "compliance",
    "framework": ["ISO 27001"],
    "controls": [
        "A.5", "A.6", "A.7", "A.8",
        "A.9", "A.10"
    ]
}