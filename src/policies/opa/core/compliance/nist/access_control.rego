package wiz.core.compliance.nist.ac

import future.keywords

default result = "pass"

# AC-5: Separation of Duties
result = "fail" if {
    some role in input.roles
    has_conflicting_duties(role)
}

# AC-6: Least Privilege
result = "fail" if {
    some user in input.users
    has_excessive_privileges(user)
}

# AC-8: System Use Notification
result = "fail" if {
    not input.systemNotification.enabled
}

# Helper functions
has_conflicting_duties(role) {
    role.permissions.development && role.permissions.approval
}

has_excessive_privileges(user) {
    user.permissions.admin && not user.requiresAdmin
}

metadata = {
    "id": "NIST-AC-001",
    "title": "NIST Access Control",
    "description": "Implements NIST 800-53 Access Control requirements",
    "severity": "HIGH",
    "category": "compliance",
    "framework": ["NIST 800-53"]
}