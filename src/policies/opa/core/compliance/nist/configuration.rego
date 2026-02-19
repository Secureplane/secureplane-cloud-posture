package wiz.core.compliance.nist.cm

import future.keywords

default result = "pass"

# CM-2: Baseline Configuration
result = "fail" if {
    not input.baselineConfig.documented
}

# CM-3: Configuration Change Control
result = "fail" if {
    not input.changeControl.enabled
}

result = "fail" if {
    not input.changeControl.approvalRequired
}

# CM-5: Access Restrictions for Change
result = "fail" if {
    not input.changeControl.accessRestrictions.enabled
}

result = "fail" if {
    input.changeControl.accessRestrictions.enforcement != "strict"
}

metadata = {
    "id": "NIST-CM-001",
    "title": "NIST Configuration Management",
    "description": "Implements NIST 800-53 Configuration Management requirements",
    "severity": "HIGH",
    "category": "compliance",
    "framework": ["NIST 800-53"]
}