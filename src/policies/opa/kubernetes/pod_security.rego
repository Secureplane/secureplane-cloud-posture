package wiz.kubernetes.pod_security

import future.keywords

default result = "pass"

# Check for privileged containers
result = "fail" if {
    some container in input.spec.containers
    container.securityContext.privileged == true
}

# Check for containers running as root
result = "fail" if {
    some container in input.spec.containers
    not container.securityContext.runAsNonRoot
}

# Check for containers with hostPath volumes
result = "fail" if {
    some volume in input.spec.volumes
    volume.hostPath
}

metadata = {
    "id": "K8S-POD-001",
    "title": "Kubernetes Pod Security Policy",
    "description": "Checks for secure pod configurations",
    "severity": "HIGH",
    "category": "Container Security",
    "framework": ["CIS", "Kubernetes Best Practices"],
    "provider": "kubernetes"
}