package wiz.core.security.container

import future.keywords

default result = "pass"

# Check container scanning requirement
result = "fail" if {
    not input.securityScan.completed
}

result = "fail" if {
    input.securityScan.highVulnerabilities > 0
}

# Check registry access control
result = "fail" if {
    not input.registry.accessControl
}

result = "fail" if {
    input.registry.publicAccess
}

metadata = {
    "id": "SEC-CONT-001",
    "title": "Container Security Requirements",
    "description": "Enforces container security scanning and registry access controls",
    "severity": "HIGH",
    "category": "security",
    "framework": ["CIS", "Docker Security"]
}