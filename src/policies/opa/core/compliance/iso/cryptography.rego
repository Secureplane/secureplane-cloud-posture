package wiz.core.compliance.iso.crypto

import future.keywords

default result = "pass"

# ISO 27001 A.10: Cryptography
result = "fail" if {
    not input.cryptography.policy.exists
}

result = "fail" if {
    not input.cryptography.keyManagement.exists
}

# Check for approved algorithms
result = "fail" if {
    some algorithm in input.cryptography.algorithms
    not is_approved_algorithm(algorithm)
}

# Helper function for approved algorithms
is_approved_algorithm(algorithm) {
    approved_algorithms = ["AES-256-GCM", "RSA-4096", "ECDSA-P384"]
    algorithm in approved_algorithms
}

metadata = {
    "id": "ISO-CRYPTO-001",
    "title": "ISO Cryptography",
    "description": "Implements ISO 27001 Cryptography requirements",
    "severity": "HIGH",
    "category": "compliance",
    "framework": ["ISO 27001"]
}