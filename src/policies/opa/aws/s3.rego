package wiz.aws.s3

import future.keywords

default result = "pass"

# Check for public S3 buckets
result = "fail" if {
    some bucket in input.buckets
    is_public(bucket)
}

# Check if bucket is public
is_public(bucket) {
    bucket.PublicAccessBlockConfiguration.BlockPublicAcls == false
}

# Check for unencrypted buckets
result = "fail" if {
    some bucket in input.buckets
    not has_encryption(bucket)
}

# Check if bucket has encryption enabled
has_encryption(bucket) {
    bucket.ServerSideEncryptionConfiguration.Rules[_].ApplyServerSideEncryptionByDefault.SSEAlgorithm
}

metadata = {
    "id": "AWS-S3-001",
    "title": "S3 Bucket Security Configuration",
    "description": "Checks for public access and encryption on S3 buckets",
    "severity": "CRITICAL",
    "category": "Storage Security",
    "framework": ["CIS", "AWS Best Practices", "PCI-DSS"],
    "provider": "aws"
}