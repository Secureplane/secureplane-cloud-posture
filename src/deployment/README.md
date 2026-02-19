# Deployment Guide

## Overview
The deployment system manages the installation and configuration of all Wiz platform components:

- Core services initialization
- Kubernetes resource deployment
- Monitoring setup
- Security module configuration

## Components

### Scripts
- `setup.ts`: Platform initialization
- `deploy.ts`: Component deployment
- `validate.ts`: Configuration validation

### Services
- `DeploymentManager`: Core component deployment
- `KubernetesService`: K8s resource management
- `MonitoringService`: Monitoring setup

### Types
- `DeploymentTypes`: Type definitions
- `ModuleConfig`: Module configuration
- `MonitoringConfig`: Monitoring configuration

## Usage

1. Initialize Platform:
```bash
npm run deploy:init -- --env prod
```

2. Deploy Components:
```bash
npm run deploy:components
```

3. Setup Monitoring:
```bash
npm run deploy:monitoring
```

## Configuration

See `config/` directory for environment-specific configurations:
- `dev.yaml`: Development environment
- `prod.yaml`: Production environment
- `monitoring.yaml`: Monitoring configuration