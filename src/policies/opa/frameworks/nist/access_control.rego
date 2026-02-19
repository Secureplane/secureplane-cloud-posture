package wiz.frameworks.nist.ac

import future.keywords
import data.wiz.core.security.access

# Merge core access control policies with NIST requirements
default result = "pass"

# AC-2: Account Management
result = "fail" if {
    not input.accountManagement.enabled
}

result = "fail" if {
    not input.accountManagement.auditEnabled
}

# AC-3: Access Enforcement
result = "fail" if {
    not input.accessEnforcement.enabled
}

# AC-4: Information Flow Enforcement
result = "fail" if {
    not input.informationFlow.controls.enabled
}

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

# AC-7: Unsuccessful Login Attempts
result = "fail" if {
    not input.loginAttempts.lockout.enabled
}

result = "fail" if {
    input.loginAttempts.threshold > 5
}

# AC-8: System Use Notification
result = "fail" if {
    not input.systemNotification.enabled
}

# AC-11: Session Lock
result = "fail" if {
    not input.sessionLock.enabled
}

result = "fail" if {
    input.sessionLock.timeout > 900 # 15 minutes
}

# AC-17: Remote Access
result = "fail" if {
    not input.remoteAccess.encryption.enabled
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
    "description": "Comprehensive NIST 800-53 Access Control requirements",
    "severity": "HIGH",
    "category": "compliance",
    "framework": ["NIST 800-53", "FedRAMP"],
    "controls": [
        "AC-2", "AC-3", "AC-4", "AC-5",
        "AC-6", "AC-7", "AC-8", "AC-11",
        "AC-17"
    ]
}