# Wiz Platform Architecture

## Directory Structure

```
src/
├── config/                    # Configuration management
│   ├── cache/                # Configuration caching
│   ├── defaults/             # Default configurations
│   ├── events/               # Configuration events
│   ├── loaders/              # Configuration loaders
│   ├── services/             # Configuration services
│   ├── types/                # Configuration type definitions
│   └── validators/           # Configuration validators
│
├── deployment/               # Deployment management
│   ├── scripts/             # Deployment scripts
│   ├── services/            # Deployment services
│   └── types/               # Deployment type definitions
│
├── modules/                  # Core security modules
│   ├── api/                 # API security
│   │   ├── analyzers/       # API security analyzers
│   │   ├── scanners/        # API scanners
│   │   └── types/           # API types
│   ├── container/           # Container security
│   │   ├── analyzers/       # Container analyzers
│   │   ├── scanners/        # Container scanners
│   │   └── types/           # Container types
│   ├── cspm/                # Cloud Security Posture Management
│   ├── cwpp/                # Cloud Workload Protection Platform
│   ├── dspm/                # Data Security Posture Management
│   ├── iac/                 # Infrastructure as Code
│   └── identity/            # Identity security
│
├── scanners/                # Security scanners
│   ├── base/                # Base scanner implementation
│   ├── cloud/               # Cloud security scanners
│   ├── container/           # Container security scanners
│   ├── data/                # Data security scanners
│   ├── iac/                 # IaC security scanners
│   └── vulnerability/       # Vulnerability scanners
│
├── monitoring/              # Monitoring and alerting
│   ├── alerts/             # Alert definitions
│   ├── dashboards/         # Grafana dashboards
│   └── metrics/            # Metrics collection
│
├── utils/                   # Shared utilities
│   ├── logger.ts           # Logging utility
│   ├── config.ts           # Configuration utility
│   └── reporting.ts        # Reporting utility
│
└── wiz/                     # Core Wiz implementation
    ├── api/                # Wiz API client
    ├── core/               # Core functionality
    ├── graph/              # Security graph analysis
    └── types/              # Core type definitions
```

## Key Components

1. Configuration Management
   - Centralized configuration handling
   - Environment-specific configs
   - Validation and caching

2. Deployment Management
   - Platform initialization
   - Kubernetes resource management
   - Service deployment

3. Security Modules
   - CSPM (Cloud Security Posture Management)
   - CWPP (Cloud Workload Protection Platform)
   - DSPM (Data Security Posture Management)
   - IaC (Infrastructure as Code)
   - Identity Security

4. Scanners
   - Base scanner implementation
   - Specialized security scanners
   - Vulnerability detection

5. Monitoring
   - Metrics collection
   - Alerting system
   - Performance monitoring

6. Core Implementation
   - API client
   - Security graph
   - Type definitions