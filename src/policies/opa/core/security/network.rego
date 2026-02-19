package wiz.core.security.network

import future.keywords

default result = "pass"

# Check TLS version
result = "fail" if {
    some endpoint in input.network.endpoints
    endpoint.tls.version < "1.2"
}

# Check for open ports
result = "fail" if {
    some port in input.network.openPorts
    port.number in [21, 23, 445, 3389]  # FTP, Telnet, SMB, RDP
}

# Check network segmentation
result = "fail" if {
    not input.network.segmentation.enabled
}

metadata = {
    "id": "SEC-NET-001",
    "title": "Network Security",
    "description": "Enforces network security best practices",
    "severity": "HIGH",
    "category": "security",
    "framework": ["CIS", "NIST", "ISO27001"]
}