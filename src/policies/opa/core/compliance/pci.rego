package wiz.core.compliance.pci

import future.keywords

default result = "pass"

# Check PCI requirement 3.4 (stored cardholder data)
result = "fail" if {
    some data in input.storage.data
    data.type == "PAN"
    not data.encrypted
}

# Check PCI requirement 8.2 (password requirements)
result = "fail" if {
    input.authentication.passwordPolicy.minLength < 8
    not input.authentication.passwordPolicy.complexity
}

# Check PCI requirement 10.2 (audit logging)
result = "fail" if {
    not input.logging.enabled
    not input.logging.auditTrail
}

metadata = {
    "id": "COMP-PCI-001",
    "title": "PCI DSS Compliance",
    "description": "Enforces PCI DSS compliance requirements",
    "severity": "CRITICAL",
    "category": "compliance",
    "framework": ["PCI-DSS"]
}