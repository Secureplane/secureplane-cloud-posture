from typing import Dict, List
from ...core.scanner import SecurityScanner

class CWPPScanner(SecurityScanner):
    def __init__(self, config: Dict):
        super().__init__(config)
        self.workload_config = config.get('workload_security', {})
        
    def scan_workloads(self) -> Dict:
        return {
            "containers": self._scan_containers(),
            "kubernetes": self._scan_kubernetes(),
            "serverless": self._scan_serverless()
        }
        
    def _scan_containers(self) -> List:
        return [
            self._scan_container_vulnerabilities(),
            self._scan_container_compliance(),
            self._scan_runtime_security()
        ]
        
    def _scan_kubernetes(self) -> Dict:
        return {
            "pod_security": self._check_pod_security(),
            "network_policies": self._check_network_policies(),
            "rbac": self._check_rbac_configuration()
        }