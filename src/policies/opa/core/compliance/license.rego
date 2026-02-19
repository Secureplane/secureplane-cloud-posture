package wiz.core.compliance.license

import future.keywords

default result = "pass"

# Check for approved licenses
result = "fail" if {
    some pkg in input.dependencies.packages
    not is_approved_license(pkg.license)
}

# Define approved licenses
approved_licenses = ["MIT", "Apache-2.0", "BSD-3-Clause", "ISC"]

# Check if license is approved
is_approved_license(license) {
    some approved in approved_licenses
    license == approved
}

# Check for license documentation
result = "fail" if {
    not input.repository.licenseFile
}

result = "fail" if {
    not input.repository.thirdPartyNotices
}

metadata = {
    "id": "COMP-LIC-001",
    "title": "License Compliance",
    "description": "Ensures all dependencies use approved licenses and proper documentation exists",
    "severity": "HIGH",
    "category": "compliance",
    "framework": ["Software Compliance"]
}