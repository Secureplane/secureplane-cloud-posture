```typescript
import { Logger } from '../../../utils/logger';
import { WizApiClient } from '../../../api/client';
import { IaCScanResult, TerraformPlan } from '../types/IaCTypes';

export class TerraformRunTaskService {
  private logger: Logger;
  private apiClient: WizApiClient;

  constructor(apiClient: WizApiClient) {
    this.logger = new Logger();
    this.apiClient = apiClient;
  }

  async scanTerraformPlan(plan: TerraformPlan): Promise<IaCScanResult> {
    try {
      this.logger.info(`Scanning Terraform plan for workspace: ${plan.workspaceId}`);

      const scanResult = await this.apiClient.scanResource({
        resourceId: plan.workspaceId,
        scanType: 'terraform',
        options: {
          planContent: plan.content,
          enforcementLevel: plan.enforcementLevel,
          policySet: plan.policySet
        }
      });

      return {
        workspaceId: plan.workspaceId,
        status: this.determineScanStatus(scanResult),
        findings: this.processFindings(scanResult.findings),
        metadata: {
          scanTime: new Date(),
          policySet: plan.policySet,
          enforcementLevel: plan.enforcementLevel
        }
      };
    } catch (error) {
      this.logger.error(`Terraform plan scan failed: ${error.message}`);
      throw error;
    }
  }

  private determineScanStatus(result: any): 'pass' | 'fail' {
    const hasBlockingViolations = result.findings.some(
      finding => finding.severity === 'HIGH' && finding.enforced
    );
    return hasBlockingViolations ? 'fail' : 'pass';
  }

  private processFindings(findings: any[]): any[] {
    return findings.map(finding => ({
      id: finding.id,
      title: finding.title,
      severity: finding.severity,
      category: finding.category,
      resourceType: finding.resourceType,
      description: finding.description,
      remediation: finding.remediation,
      enforced: finding.enforced
    }));
  }
}
```