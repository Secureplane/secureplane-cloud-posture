package wiz.core.security.encryption

import future.keywords

default result = "pass"

# Check data encryption
result = "fail" if {
    not input.encryption.enabled
}

# Check encryption algorithm strength
result = "fail" if {
    not is_approved_algorithm(input.encryption.algorithm)
}

# Define approved encryption algorithms
approved_algorithms = ["AES-256-GCM", "AES-256-CBC"]

# Check if algorithm is approved
is_approved_algorithm(algorithm) {
    some approved in approved_algorithms
    algorithm == approved
}

metadata = {
    "id": "SEC-ENC-001",
    "title": "Data Encryption Requirements",
    "description": "Enforces data encryption requirements and algorithm standards",
    "severity": "CRITICAL",
    "category": "security",
    "framework": ["NIST", "PCI-DSS", "HIPAA"]
}