import { Logger } from '../../utils/Logger';
import { OpenAI } from 'openai';
import { SecurityContext } from './types/SecurityTypes';
import { AlertAnalyzer } from './analyzers/AlertAnalyzer';
import { RemediationGenerator } from './generators/RemediationGenerator';
import { InsightEngine } from './engines/InsightEngine';

export class SecurityAssistant {
  private logger: Logger;
  private openai: OpenAI;
  private alertAnalyzer: AlertAnalyzer;
  private remediationGenerator: RemediationGenerator;
  private insightEngine: InsightEngine;

  constructor(apiKey: string) {
    this.logger = new Logger('SecurityAssistant');
    this.openai = new OpenAI({ apiKey });
    this.alertAnalyzer = new AlertAnalyzer(this.openai);
    this.remediationGenerator = new RemediationGenerator(this.openai);
    this.insightEngine = new InsightEngine(this.openai);
  }

  async analyzeAlert(alertId: string, context: SecurityContext): Promise<any> {
    try {
      this.logger.info(`Analyzing alert: ${alertId}`);

      const [analysis, remediation, insights] = await Promise.all([
        this.alertAnalyzer.analyze(alertId, context),
        this.remediationGenerator.generateRemediation(alertId, context),
        this.insightEngine.generateInsights(alertId, context)
      ]);

      return {
        analysis,
        remediation,
        insights,
        timestamp: new Date()
      };
    } catch (error) {
      this.logger.error(`Failed to analyze alert: ${error.message}`);
      throw error;
    }
  }

  async explainFinding(findingId: string, context: SecurityContext): Promise<any> {
    try {
      const explanation = await this.insightEngine.explainFinding(findingId, context);
      return {
        explanation,
        recommendations: await this.remediationGenerator.generateRecommendations(findingId, context),
        relatedFindings: await this.alertAnalyzer.findRelatedIssues(findingId, context)
      };
    } catch (error) {
      this.logger.error(`Failed to explain finding: ${error.message}`);
      throw error;
    }
  }

  async suggestRuleUpdates(ruleId: string, context: SecurityContext): Promise<any> {
    try {
      return await this.insightEngine.suggestRuleImprovements(ruleId, context);
    } catch (error) {
      this.logger.error(`Failed to suggest rule updates: ${error.message}`);
      throw error;
    }
  }
}