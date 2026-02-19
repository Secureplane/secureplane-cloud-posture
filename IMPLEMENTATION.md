# Wiz CNAPP Implementation Guide

[Previous content remains the same...]

## Configuration Management

### 1. Environment Configuration

#### Development Environment
```yaml
# config/dev.yaml
environment: development
logging:
  level: debug
  destination: console

api:
  endpoint: https://api.dev.wiz.io/v1
  timeout: 60000

scanning:
  interval: 1800
  parallel: 5
```

#### Production Environment
```yaml
# config/prod.yaml
environment: production
logging:
  level: info
  destination: file

api:
  endpoint: https://api.wiz.io/v1
  timeout: 30000

scanning:
  interval: 3600
  parallel: 10
```

### 2. Secret Management

#### Vault Integration
```typescript
// src/config/services/SecretManager.ts
export class SecretManager {
  async getCredentials(): Promise<Credentials> {
    const vault = new VaultClient(this.config);
    return vault.getSecrets('wiz/credentials');
  }

  async rotateKeys(): Promise<void> {
    // Key rotation implementation
  }
}
```

#### Kubernetes Secrets
```yaml
# kubernetes/wiz/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: wiz-credentials
  namespace: wiz-system
type: Opaque
data:
  apiKey: ${WIZ_API_KEY}
  apiSecret: ${WIZ_API_SECRET}
```

## Monitoring & Alerting

### 1. Metrics Collection

#### Prometheus Configuration
```yaml
# monitoring/prometheus/config.yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'wiz-sensors'
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: ['wiz-system']
```

#### Custom Metrics
```typescript
// src/monitoring/metrics/SecurityMetrics.ts
export class SecurityMetrics {
  private registry: Registry;

  constructor() {
    this.registry = new Registry();
    this.initializeMetrics();
  }

  private initializeMetrics(): void {
    this.vulnerabilityCounter = new Counter({
      name: 'wiz_vulnerabilities_total',
      help: 'Total number of detected vulnerabilities'
    });

    this.complianceGauge = new Gauge({
      name: 'wiz_compliance_score',
      help: 'Current compliance score'
    });
  }
}
```

### 2. Alerting System

#### Alert Rules
```yaml
# monitoring/alerts/rules.yaml
groups:
  - name: security_alerts
    rules:
      - alert: HighSeverityVulnerability
        expr: wiz_vulnerability_severity{level="critical"} > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: Critical vulnerability detected

      - alert: ComplianceViolation
        expr: wiz_compliance_score < 80
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: Compliance score below threshold
```

#### Alert Manager
```yaml
# monitoring/alertmanager/config.yaml
route:
  group_by: ['alertname', 'severity']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'security-team'

receivers:
  - name: 'security-team'
    slack_configs:
      - channel: '#security-alerts'
        api_url: '${SLACK_WEBHOOK_URL}'
```

### 3. Dashboards

#### Grafana Dashboard
```json
{
  "dashboard": {
    "title": "Wiz Security Overview",
    "panels": [
      {
        "title": "Vulnerability Trends",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(wiz_vulnerabilities_total) by (severity)",
            "legendFormat": "{{severity}}"
          }
        ]
      },
      {
        "title": "Compliance Status",
        "type": "gauge",
        "targets": [
          {
            "expr": "wiz_compliance_score",
            "legendFormat": "Compliance Score"
          }
        ]
      }
    ]
  }
}
```

## Advanced Features

### 1. Risk Assessment

#### Risk Scoring
```typescript
// src/modules/risk/RiskAssessment.ts
export class RiskAssessment {
  async calculateRiskScore(findings: Finding[]): Promise<number> {
    return findings.reduce((score, finding) => {
      const severityScore = this.getSeverityScore(finding.severity);
      const exposureScore = this.getExposureScore(finding.exposure);
      return score + (severityScore * exposureScore);
    }, 0);
  }

  private getSeverityScore(severity: Severity): number {
    const scores = {
      critical: 10,
      high: 8,
      medium: 5,
      low: 2
    };
    return scores[severity] || 0;
  }
}
```

### 2. Compliance Automation

#### Compliance Checks
```typescript
// src/modules/compliance/ComplianceChecker.ts
export class ComplianceChecker {
  async checkCompliance(framework: string): Promise<ComplianceResult> {
    const controls = await this.loadControls(framework);
    const results = await Promise.all(
      controls.map(control => this.evaluateControl(control))
    );

    return {
      framework,
      timestamp: new Date(),
      controls: results,
      score: this.calculateScore(results)
    };
  }

  private async evaluateControl(control: Control): Promise<ControlResult> {
    // Control evaluation implementation
  }
}
```

### 3. Automated Remediation

#### Remediation Engine
```typescript
// src/modules/remediation/RemediationEngine.ts
export class RemediationEngine {
  async createRemediationPlan(findings: Finding[]): Promise<RemediationPlan> {
    const actions = findings.map(finding => ({
      id: finding.id,
      priority: this.calculatePriority(finding),
      steps: this.generateRemediationSteps(finding),
      automation: this.checkAutomationPossibility(finding)
    }));

    return {
      timestamp: new Date(),
      actions: this.prioritizeActions(actions),
      estimatedTime: this.calculateEstimatedTime(actions)
    };
  }

  private generateRemediationSteps(finding: Finding): RemediationStep[] {
    // Step generation implementation
  }
}
```

[Continue with more sections as needed...]