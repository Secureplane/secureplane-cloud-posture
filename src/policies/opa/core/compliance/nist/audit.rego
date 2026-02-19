package wiz.core.compliance.nist.au

import future.keywords

default result = "pass"

# AU-2: Audit Events
result = "fail" if {
    not input.auditConfig.enabled
}

result = "fail" if {
    some required in required_events
    not input.auditConfig.events[required]
}

# AU-6: Audit Review and Analysis
result = "fail" if {
    not input.auditConfig.review.enabled
}

result = "fail" if {
    input.auditConfig.review.interval > 168 # Weekly review (hours)
}

# Required audit events
required_events = {
    "authentication",
    "authorization",
    "configuration_changes",
    "data_access",
    "privileged_operations"
}

metadata = {
    "id": "NIST-AU-001",
    "title": "NIST Audit Requirements",
    "description": "Implements NIST 800-53 Audit requirements",
    "severity": "HIGH",
    "category": "compliance",
    "framework": ["NIST 800-53"]
}