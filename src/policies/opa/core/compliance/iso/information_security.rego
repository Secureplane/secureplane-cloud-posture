package wiz.core.compliance.iso.is

import future.keywords

default result = "pass"

# ISO 27001 A.5: Information Security Policies
result = "fail" if {
    not input.securityPolicies.documented
}

result = "fail" if {
    not input.securityPolicies.reviewed
}

# ISO 27001 A.8: Asset Management
result = "fail" if {
    not input.assetManagement.inventory.exists
}

result = "fail" if {
    input.assetManagement.inventory.lastUpdate < (time.now_ns() - (90 * 24 * 60 * 60 * 1000000000)) # 90 days
}

metadata = {
    "id": "ISO-IS-001",
    "title": "ISO Information Security",
    "description": "Implements ISO 27001 Information Security requirements",
    "severity": "HIGH",
    "category": "compliance",
    "framework": ["ISO 27001"]
}