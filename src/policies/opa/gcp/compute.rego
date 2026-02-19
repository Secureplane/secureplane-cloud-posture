package wiz.gcp.compute

import future.keywords

default result = "pass"

# Check for public IP addresses
result = "fail" if {
    some instance in input.instances
    instance.networkInterfaces[_].accessConfigs[_].type == "ONE_TO_ONE_NAT"
}

# Check OS login
result = "fail" if {
    some instance in input.instances
    not instance.metadata.items[_].key == "enable-oslogin"
}

# Check service account
result = "fail" if {
    some instance in input.instances
    instance.serviceAccounts[_].email == "default"
}

metadata = {
    "id": "GCP-COMPUTE-001",
    "title": "GCP Compute Engine Security",
    "description": "Enforces GCP Compute Engine security best practices",
    "severity": "HIGH",
    "category": "compute",
    "framework": ["CIS", "GCP Security"],
    "provider": "gcp"
}