import { z } from 'zod';
import { WizConfig } from '../types/ConfigTypes';
import { SchemaValidator } from './SchemaValidator';

const ApiConfigSchema = z.object({
  endpoint: SchemaValidator.createStringSchema({ required: true, url: true }),
  timeout: SchemaValidator.createNumberSchema({ min: 1000, required: true }),
  retries: SchemaValidator.createNumberSchema({ min: 0, required: true }),
  credentials: z.object({
    apiKey: SchemaValidator.createStringSchema({ required: true }),
    apiSecret: SchemaValidator.createStringSchema({ required: true })
  })
});

const ScanningConfigSchema = z.object({
  interval: SchemaValidator.createNumberSchema({ min: 300, required: true }),
  parallel: SchemaValidator.createNumberSchema({ min: 1, required: true }),
  modules: z.object({
    vulnerability: SchemaValidator.createBooleanSchema(true),
    cloud: SchemaValidator.createBooleanSchema(true),
    kubernetes: SchemaValidator.createBooleanSchema(true),
    container: SchemaValidator.createBooleanSchema(true)
  })
});

const SecurityConfigSchema = z.object({
  minSeverity: SchemaValidator.createEnumSchema(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const, true),
  enableAttackPaths: SchemaValidator.createBooleanSchema(true),
  networkPolicies: SchemaValidator.createBooleanSchema(true),
  podSecurity: SchemaValidator.createBooleanSchema(true)
});

const ReportingConfigSchema = z.object({
  format: SchemaValidator.createEnumSchema(['json', 'html', 'pdf'] as const, true),
  destination: SchemaValidator.createStringSchema({ required: true }),
  includeRemediation: SchemaValidator.createBooleanSchema(true)
});

const IntegrationsConfigSchema = z.object({
  cloudProviders: z.object({
    aws: SchemaValidator.createBooleanSchema(true),
    azure: SchemaValidator.createBooleanSchema(true),
    gcp: SchemaValidator.createBooleanSchema(true)
  }),
  cicd: z.object({
    gitlab: SchemaValidator.createBooleanSchema(true),
    github: SchemaValidator.createBooleanSchema(true)
  })
});

export const WizConfigSchema = z.object({
  api: ApiConfigSchema,
  scanning: ScanningConfigSchema,
  security: SecurityConfigSchema,
  reporting: ReportingConfigSchema,
  integrations: IntegrationsConfigSchema
});

export function validateConfig(config: WizConfig): boolean {
  try {
    WizConfigSchema.parse(config);
    return true;
  } catch (error) {
    console.error('Config validation failed:', error);
    return false;
  }
}