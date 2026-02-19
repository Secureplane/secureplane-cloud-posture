"""Unified security dashboard implementation."""

from typing import Dict, List
from ..core.scanner import SecurityScanner

class UnifiedDashboard:
    """Unified security dashboard for all CNAPP components."""
    
    def __init__(self, config: Dict):
        self.config = config
        self.scanners = self._initialize_scanners()
        
    def generate_security_overview(self) -> Dict:
        """Generate comprehensive security overview."""
        return {
            "cloud_posture": self._get_cloud_posture(),
            "kubernetes_posture": self._get_kubernetes_posture(),
            "data_security": self._get_data_security(),
            "workload_security": self._get_workload_security(),
            "identity_security": self._get_identity_security(),
            "compliance_status": self._get_compliance_status()
        }
        
    def generate_risk_assessment(self) -> Dict:
        """Generate unified risk assessment."""
        return {
            "critical_risks": self._identify_critical_risks(),
            "attack_paths": self._analyze_attack_paths(),
            "compliance_gaps": self._identify_compliance_gaps(),
            "remediation_priorities": self._prioritize_remediation()
        }
        
    def _initialize_scanners(self) -> Dict:
        """Initialize all security scanners."""
        return {
            "cspm": self._init_cspm_scanner(),
            "kspm": self._init_kspm_scanner(),
            "cwpp": self._init_cwpp_scanner(),
            "dspm": self._init_dspm_scanner(),
            "identity": self._init_identity_scanner()
        }