import { ApiScanner } from '../api/scanners/api.scanner';
import { SecurityGraph } from '../graph/security_graph';
import { RiskPrioritizer } from '../prioritization/risk_prioritizer';
import { Logger } from '../utils/logger';
import { ApiScanConfig } from '../api/scanners/config/scan.config';

export class ApiConsole {
  private scanner: ApiScanner;
  private securityGraph: SecurityGraph;
  private riskPrioritizer: RiskPrioritizer;
  private logger: Logger;

  constructor(config: ApiScanConfig) {
    this.scanner = new ApiScanner(config);
    this.securityGraph = new SecurityGraph(config);
    this.riskPrioritizer = new RiskPrioritizer(config);
    this.logger = new Logger();
  }

  async analyzeApi(endpoint: string) {
    try {
      this.logger.info(`Starting API security analysis for ${endpoint}`);

      // Perform API scan
      const scanResults = await this.scanner.scanApi(endpoint, {
        includeSwagger: true,
        depth: 'full',
        scanTypes: [
          'authentication',
          'authorization',
          'data_validation',
          'rate_limiting',
          'security_headers'
        ]
      });

      // Build security graph
      const graphResults = await this.securityGraph.build_graph();

      // Prioritize risks
      const prioritizedRisks = await this.riskPrioritizer.prioritize_risks(scanResults.findings);

      return {
        scanResults,
        graphResults,
        prioritizedRisks,
        metadata: {
          timestamp: new Date(),
          endpoint,
          scanDuration: scanResults.metadata.duration
        }
      };
    } catch (error) {
      this.logger.error(`API analysis failed: ${error}`);
      throw error;
    }
  }
}