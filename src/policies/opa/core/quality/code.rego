package wiz.core.quality.code

import future.keywords

default result = "pass"

# Check code linting
result = "fail" if {
    not input.linting.passed
}

result = "fail" if {
    input.linting.errors > 0
}

# Check test coverage
result = "fail" if {
    input.testing.coverage < 80
}

metadata = {
    "id": "QUAL-CODE-001",
    "title": "Code Quality Standards",
    "description": "Enforces code quality standards including linting and test coverage",
    "severity": "HIGH",
    "category": "quality",
    "framework": ["Development Best Practices"]
}