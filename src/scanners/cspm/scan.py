from typing import Dict
from ...core.scanner import SecurityScanner

class CSPMScanner(SecurityScanner):
    def __init__(self, config: Dict):
        super().__init__(config)
        self.cloud_config = config.get('cloud_security', {})
        
    def scan_cloud_posture(self) -> Dict:
        return {
            "misconfigurations": self._scan_misconfigurations(),
            "compliance": self._check_compliance(),
            "security_score": self._calculate_security_score()
        }
        
    def _scan_misconfigurations(self) -> Dict:
        return {
            "storage": self._scan_storage_config(),
            "network": self._scan_network_config(),
            "iam": self._scan_iam_config()
        }
        
    def _check_compliance(self) -> Dict:
        return {
            "cis": self._check_cis_compliance(),
            "hipaa": self._check_hipaa_compliance(),
            "pci": self._check_pci_compliance()
        }