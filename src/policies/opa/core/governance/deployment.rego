package wiz.core.governance.deployment

import future.keywords

default result = "pass"

# Check deployment approval
result = "fail" if {
    input.deployment.environment == "production"
    not has_valid_approval(input.deployment)
}

# Check rollback configuration
result = "fail" if {
    not input.deployment.rollbackEnabled
}

result = "fail" if {
    not input.deployment.healthChecks
}

# Helper function to check valid approval
has_valid_approval(deployment) {
    deployment.approved == true
    deployment.approver != deployment.requester
}

metadata = {
    "id": "GOV-DEP-001",
    "title": "Deployment Governance",
    "description": "Enforces deployment approval and rollback requirements",
    "severity": "HIGH",
    "category": "governance",
    "framework": ["DevOps Best Practices"]
}