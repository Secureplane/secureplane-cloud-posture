import { Logger } from '../../../utils/Logger';
import { RiskAssessment, RiskFinding } from '../types/RiskTypes';

export class RiskAnalyzer {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('RiskAnalyzer');
  }

  async analyzeRisks(findings: RiskFinding[]): Promise<RiskAssessment> {
    try {
      const criticalRisks = this.identifyCriticalRisks(findings);
      const riskScore = this.calculateRiskScore(findings);
      const exposureLevel = this.determineExposureLevel(findings);
      
      return {
        criticalRisks,
        riskScore,
        exposureLevel,
        recommendations: this.generateRecommendations(criticalRisks),
        metadata: {
          timestamp: new Date(),
          findingsAnalyzed: findings.length
        }
      };
    } catch (error) {
      this.logger.error(`Risk analysis failed: ${error.message}`);
      throw error;
    }
  }

  private identifyCriticalRisks(findings: RiskFinding[]): RiskFinding[] {
    return findings.filter(finding => finding.severity === 'CRITICAL');
  }

  private calculateRiskScore(findings: RiskFinding[]): number {
    const weights = {
      CRITICAL: 1.0,
      HIGH: 0.7,
      MEDIUM: 0.4,
      LOW: 0.1
    };

    return findings.reduce((score, finding) => {
      return score + (weights[finding.severity] || 0);
    }, 0);
  }

  private determineExposureLevel(findings: RiskFinding[]): string {
    const riskScore = this.calculateRiskScore(findings);
    if (riskScore > 7) return 'HIGH';
    if (riskScore > 4) return 'MEDIUM';
    return 'LOW';
  }

  private generateRecommendations(criticalRisks: RiskFinding[]): string[] {
    return criticalRisks.map(risk => risk.remediation);
  }
}