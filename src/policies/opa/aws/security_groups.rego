package wiz.aws.security_groups

import future.keywords

default result = "pass"

# IP ranges representing all internet traffic
internet_ips = ["0.0.0.0/0", "::/0"]

# Fail if any security group has unrestricted outbound traffic
result = "fail" if {
    some permission in input.IpPermissionsEgress
    unrestricted_destination_ips(permission)
}

# Check if security group rule allows unrestricted internet access
unrestricted_destination_ips(permission) {
    some ip_range in permission.IpRanges
    some internet_ip in internet_ips
    ip_range.CidrIp == internet_ip
}

# Metadata for the policy
metadata = {
    "id": "AWS-SG-001",
    "title": "Security Group Unrestricted Outbound Traffic",
    "description": "Checks if security groups allow unrestricted outbound traffic to the internet",
    "severity": "HIGH",
    "category": "Network Security",
    "framework": ["CIS", "AWS Best Practices"],
    "provider": "aws"
}