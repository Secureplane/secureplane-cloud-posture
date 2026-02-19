package wiz.core.security.api

import future.keywords

default result = "pass"

# Check API authentication
result = "fail" if {
    some endpoint in input.api.endpoints
    not endpoint.authentication.enabled
}

# Check rate limiting
result = "fail" if {
    some endpoint in input.api.endpoints
    not endpoint.rateLimit.enabled
}

# Check security headers
required_headers = {
    "X-Content-Type-Options",
    "X-Frame-Options",
    "X-XSS-Protection",
    "Strict-Transport-Security"
}

result = "fail" if {
    some endpoint in input.api.endpoints
    some required in required_headers
    not endpoint.headers[required]
}

metadata = {
    "id": "SEC-API-001",
    "title": "API Security",
    "description": "Enforces API security best practices",
    "severity": "HIGH",
    "category": "security",
    "framework": ["OWASP API Security"]
}