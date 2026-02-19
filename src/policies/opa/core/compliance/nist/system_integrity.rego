package wiz.core.compliance.nist.si

import future.keywords

default result = "pass"

# SI-2: Flaw Remediation
result = "fail" if {
    not input.flawRemediation.enabled
}

result = "fail" if {
    input.flawRemediation.criticalPatchWindow > 24 # hours
}

# SI-7: Software and Information Integrity
result = "fail" if {
    not input.integrityVerification.enabled
}

result = "fail" if {
    not input.integrityVerification.methods.cryptographic
}

metadata = {
    "id": "NIST-SI-001",
    "title": "NIST System Integrity",
    "description": "Implements NIST 800-53 System Integrity requirements",
    "severity": "HIGH",
    "category": "compliance",
    "framework": ["NIST 800-53"]
}