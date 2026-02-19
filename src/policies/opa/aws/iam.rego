package wiz.aws.iam

import future.keywords

default result = "pass"

# Check for IAM users with admin privileges
result = "fail" if {
    some user in input.users
    has_admin_privileges(user)
}

# Check if user has admin privileges
has_admin_privileges(user) {
    some policy in user.attached_policies
    policy.PolicyName == "AdministratorAccess"
}

# Check for access keys older than 90 days
result = "fail" if {
    some user in input.users
    some key in user.access_keys
    key_age_days(key) > 90
}

# Calculate access key age in days
key_age_days(key) = days {
    create_date = time.parse_rfc3339_ns(key.CreateDate)
    now = time.now_ns()
    days = (now - create_date) / (24 * 60 * 60 * 1000000000)
}

metadata = {
    "id": "AWS-IAM-001",
    "title": "IAM User Security Checks",
    "description": "Checks for IAM users with admin privileges and old access keys",
    "severity": "HIGH",
    "category": "Identity and Access Management",
    "framework": ["CIS", "AWS Best Practices"],
    "provider": "aws"
}