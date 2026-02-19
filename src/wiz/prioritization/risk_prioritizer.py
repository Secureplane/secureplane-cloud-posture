"""Risk prioritization based on business impact."""

from typing import Dict, List

class RiskPrioritizer:
    def __init__(self, config: Dict):
        self.config = config
        
    async def prioritize_risks(self, risks: List) -> List:
        """Prioritize risks based on business impact."""
        return sorted(
            risks,
            key=lambda x: self._calculate_priority_score(x),
            reverse=True
        )
        
    def _calculate_priority_score(self, risk: Dict) -> float:
        """Calculate priority score for a risk."""
        return (
            self._get_business_impact(risk) *
            self._get_exposure_score(risk) *
            self._get_exploit_likelihood(risk)
        )
        
    def _get_business_impact(self, risk: Dict) -> float:
        """Calculate business impact score."""
        factors = {
            "data_sensitivity": self._assess_data_sensitivity(risk),
            "service_criticality": self._assess_service_criticality(risk),
            "regulatory_impact": self._assess_regulatory_impact(risk)
        }
        return sum(factors.values()) / len(factors)
        
    def _get_exposure_score(self, risk: Dict) -> float:
        """Calculate exposure score."""
        factors = {
            "network_exposure": self._assess_network_exposure(risk),
            "authentication_bypass": self._assess_auth_bypass(risk),
            "privilege_escalation": self._assess_privilege_escalation(risk)
        }
        return sum(factors.values()) / len(factors)