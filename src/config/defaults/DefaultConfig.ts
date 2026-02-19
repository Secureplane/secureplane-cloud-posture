import { WizConfig } from '../types/ConfigTypes';

export const defaultConfig: WizConfig = {
  api: {
    endpoint: 'https://api.wiz.io/v1',
    timeout: 30000,
    retries: 3,
    credentials: {
      apiKey: '',
      apiSecret: ''
    }
  },
  scanning: {
    interval: 3600,
    parallel: 10,
    modules: {
      vulnerability: true,
      cloud: true,
      kubernetes: true,
      container: true
    }
  },
  security: {
    minSeverity: 'HIGH',
    enableAttackPaths: true,
    networkPolicies: true,
    podSecurity: true
  },
  reporting: {
    format: 'json',
    destination: './reports',
    includeRemediation: true
  },
  integrations: {
    cloudProviders: {
      aws: true,
      azure: true,
      gcp: true
    },
    cicd: {
      gitlab: true,
      github: true
    }
  }
};