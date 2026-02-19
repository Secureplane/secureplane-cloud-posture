```markdown
# Wiz CNAPP Quick Start Guide

## Overview
This guide provides step-by-step instructions for getting started with the Wiz Cloud Native Application Protection Platform (CNAPP).

## Prerequisites
- Cloud provider accounts (AWS/Azure/GCP)
- Kubernetes cluster 1.19+
- Helm 3.0+
- Node.js 16+
- TypeScript 4.5+

## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/your-org/wiz-cnapp
cd wiz-cnapp
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Initialize platform:
```bash
npm run init
```

5. Deploy core components:
```bash
npm run deploy
```

## Initial Configuration

### 1. Cloud Provider Setup
```yaml
# config/providers.yaml
providers:
  aws:
    enabled: true
    regions: ["us-east-1"]
  azure:
    enabled: true
    subscriptions: ["prod"]
```

### 2. Security Module Configuration
```yaml
# config/security.yaml
modules:
  cspm:
    enabled: true
    scan_interval: 3600
  cwpp:
    enabled: true
    runtime_protection: true
```

## Verification Steps

1. Check deployment status:
```bash
kubectl get pods -n wiz-system
```

2. Verify connectivity:
```bash
curl -I https://api.wiz.io/healthz
```

3. Test scanning:
```bash
npm run scan:test
```

## Next Steps
1. Configure additional security policies
2. Set up monitoring and alerting
3. Enable compliance frameworks
4. Configure custom rules
```