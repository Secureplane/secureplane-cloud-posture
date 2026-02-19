package wiz.frameworks.nist.au

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

# AU-3: Content of Audit Records
result = "fail" if {
    some record in input.auditConfig.records
    not has_required_content(record)
}

# AU-4: Audit Storage Capacity
result = "fail" if {
    not input.auditConfig.storage.monitoring
}

# AU-5: Response to Audit Processing Failures
result = "fail" if {
    not input.auditConfig.failureResponse.enabled
}

# AU-6: Audit Review, Analysis, and Reporting
result = "fail" if {
    not input.auditConfig.review.enabled
}

result = "fail" if {
    input.auditConfig.review.interval > 168 # Weekly review (hours)
}

# AU-7: Audit Reduction and Report Generation
result = "fail" if {
    not input.auditConfig.reporting.enabled
}

# AU-8: Time Stamps
result = "fail" if {
    not input.auditConfig.timeSync.enabled
}

# AU-9: Protection of Audit Information
result = "fail" if {
    not input.auditConfig.protection.encryption
}

# Required audit events
required_events = {
    "authentication",
    "authorization",
    "configuration_changes",
    "data_access",
    "privileged_operations",
    "system_events",
    "security_events"
}

# Helper functions
has_required_content(record) {
    required_fields = ["timestamp", "user", "action", "resource", "outcome"]
    all_fields_present(record, required_fields)
}

all_fields_present(record, fields) {
    all(field | fields[_] == field; record[field])
}

metadata = {
    "id": "NIST-AU-001",
    "title": "NIST Audit and Accountability",
    "description": "Comprehensive NIST 800-53 Audit requirements",
    "severity": "HIGH",
    "category": "compliance",
    "framework": ["NIST 800-53", "FedRAMP"],
    "controls": [
        "AU-2", "AU-3", "AU-4", "AU-5",
        "AU-6", "AU-7", "AU-8", "AU-9"
    ]
}