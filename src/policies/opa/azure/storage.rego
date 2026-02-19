package wiz.azure.storage

import future.keywords

default result = "pass"

# Check for public blob containers
result = "fail" if {
    some container in input.containers
    container.public_access != "None"
}

# Check for unencrypted storage accounts
result = "fail" if {
    not input.encryption.services.blob.enabled
}

# Check for secure transfer requirement
result = "fail" if {
    not input.enable_https_traffic_only
}

metadata = {
    "id": "AZURE-STORAGE-001",
    "title": "Azure Storage Security Configuration",
    "description": "Checks for secure storage account configurations",
    "severity": "HIGH",
    "category": "Storage Security",
    "framework": ["CIS", "Azure Security Benchmark"],
    "provider": "azure"
}