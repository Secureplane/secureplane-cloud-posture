package wiz.azure.keyvault

import future.keywords

default result = "pass"

# Check for soft delete
result = "fail" if {
    not input.properties.enableSoftDelete
}

# Check for purge protection
result = "fail" if {
    not input.properties.enablePurgeProtection
}

# Check network access
result = "fail" if {
    input.properties.networkAcls.defaultAction == "Allow"
}

metadata = {
    "id": "AZURE-KV-001",
    "title": "Azure Key Vault Security",
    "description": "Enforces Azure Key Vault security best practices",
    "severity": "CRITICAL",
    "category": "secrets",
    "framework": ["CIS", "Azure Security"],
    "provider": "azure"
}