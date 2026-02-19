# Wiz CNAPP Monitoring Guide

## Overview

This guide covers the comprehensive monitoring setup for the Wiz CNAPP platform, including metrics collection, alerting, and observability.

## Monitoring Architecture

### 1. Metrics Collection

```yaml
# monitoring/metrics-config.yaml
metrics:
  collection:
    interval: 15s
    retention: 30d
    exporters:
      - type: prometheus
        port: 9090
      - type: datadog
        apiKey: ${DATADOG_API_KEY}

  categories:
    security:
      - name: vulnerability_count
        type: counter
        labels: [severity, resource_type]
      - name: compliance_score
        type: gauge
        labels: [framework, component]
    
    performance:
      - name: scan_duration
        type: histogram
        buckets: [10, 30, 60, 120, 300]
      - name: api_latency
        type: histogram
        buckets: [0.1, 0.5, 1, 2, 5]
```

### 2. Alert Configuration

```yaml
# monitoring/alerts-config.yaml
alerts:
  providers:
    slack:
      webhook: ${SLACK_WEBHOOK_URL}
      channels:
        critical: "#security-critical"
        high: "#security-alerts"
        
    email:
      smtp:
        host: smtp.company.com
        port: 587
      recipients:
        - security-team@company.com
        - ops-team@company.com

  rules:
    critical_vulnerability:
      condition: vulnerability_count{severity="critical"} > 0
      duration: 5m
      channels: [slack.critical, email]
      
    compliance_breach:
      condition: compliance_score < 80
      duration: 1h
      channels: [slack.high, email]
```

### 3. Dashboard Setup

```typescript
// src/monitoring/dashboards/SecurityDashboard.ts
export const securityDashboard = {
  title: 'Security Overview',
  refresh: '5m',
  panels: [
    {
      title: 'Critical Vulnerabilities',
      type: 'timeseries',
      query: 'sum(vulnerability_count{severity="critical"}) by (resource_type)'
    },
    {
      title: 'Compliance Status',
      type: 'gauge',
      query: 'avg(compliance_score) by (framework)'
    }
  ]
};
```

## Implementation Details

### 1. Metrics Implementation

```typescript
// src/monitoring/metrics/SecurityMetrics.ts
export class SecurityMetrics {
  private registry: Registry;

  constructor() {
    this.registry = new Registry();
    this.initializeMetrics();
  }

  private initializeMetrics(): void {
    // Vulnerability metrics
    this.vulnerabilityCounter = new Counter({
      name: 'wiz_vulnerabilities_total',
      help: 'Total number of vulnerabilities',
      labelNames: ['severity', 'resource_type']
    });

    // Compliance metrics
    this.complianceGauge = new Gauge({
      name: 'wiz_compliance_score',
      help: 'Current compliance score',
      labelNames: ['framework']
    });

    // Performance metrics
    this.scanDurationHistogram = new Histogram({
      name: 'wiz_scan_duration_seconds',
      help: 'Duration of security scans',
      buckets: [10, 30, 60, 120, 300]
    });
  }

  async recordVulnerability(severity: string, resourceType: string): Promise<void> {
    this.vulnerabilityCounter.inc({ severity, resource_type: resourceType });
  }

  async updateComplianceScore(framework: string, score: number): Promise<void> {
    this.complianceGauge.set({ framework }, score);
  }

  async recordScanDuration(durationSeconds: number): Promise<void> {
    this.scanDurationHistogram.observe(durationSeconds);
  }
}
```

### 2. Alert Implementation

```typescript
// src/monitoring/alerts/AlertManager.ts
export class AlertManager {
  private providers: AlertProvider[];

  constructor(config: AlertConfig) {
    this.providers = this.initializeProviders(config);
  }

  async handleAlert(alert: Alert): Promise<void> {
    const relevantProviders = this.getProvidersForSeverity(alert.severity);
    
    await Promise.all(
      relevantProviders.map(provider => 
        provider.sendAlert({
          title: alert.title,
          description: alert.description,
          severity: alert.severity,
          timestamp: new Date(),
          metadata: alert.metadata
        })
      )
    );
  }

  private getProvidersForSeverity(severity: string): AlertProvider[] {
    return this.providers.filter(provider => 
      provider.config.severities.includes(severity)
    );
  }
}
```

### 3. Dashboard Implementation

```typescript
// src/monitoring/dashboards/DashboardManager.ts
export class DashboardManager {
  private grafanaClient: GrafanaClient;

  constructor(config: DashboardConfig) {
    this.grafanaClient = new GrafanaClient(config.grafana);
  }

  async createSecurityDashboard(): Promise<void> {
    const dashboard = {
      title: 'Security Overview',
      panels: [
        this.createVulnerabilityPanel(),
        this.createCompliancePanel(),
        this.createScanningPanel()
      ]
    };

    await this.grafanaClient.createDashboard(dashboard);
  }

  private createVulnerabilityPanel(): Panel {
    return {
      title: 'Vulnerabilities by Severity',
      type: 'graph',
      datasource: 'Prometheus',
      targets: [{
        expr: 'sum(wiz_vulnerabilities_total) by (severity)',
        legendFormat: '{{severity}}'
      }]
    };
  }
}
```

## Best Practices

### 1. Performance Optimization
- Use appropriate metric types
- Set reasonable scrape intervals
- Implement metric aggregation
- Configure retention policies

### 2. Reliability
- Implement metric buffering
- Handle provider outages
- Monitor the monitoring system
- Regular backup of dashboards

### 3. Security
- Encrypt sensitive metrics
- Implement access controls
- Audit monitoring access
- Secure dashboard access