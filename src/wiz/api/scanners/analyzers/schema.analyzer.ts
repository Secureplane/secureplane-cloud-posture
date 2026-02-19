import { Finding } from '../../../types';
import { Logger } from '../../../utils/logger';
import SwaggerParser from 'swagger-parser';
import Ajv from 'ajv';

export class SchemaAnalyzer {
  private logger: Logger;
  private ajv: Ajv;

  constructor() {
    this.logger = new Logger();
    this.ajv = new Ajv();
  }

  async analyzeApiSchema(apiSpec: any): Promise<Finding[]> {
    try {
      const validatedSpec = await SwaggerParser.validate(apiSpec);
      const findings: Finding[] = [];

      findings.push(...this.validateEndpoints(validatedSpec));
      findings.push(...this.validateSchemas(validatedSpec));
      findings.push(...this.validateSecurity(validatedSpec));

      return findings;
    } catch (error) {
      this.logger.error(`Schema analysis failed: ${error}`);
      throw error;
    }
  }

  private validateEndpoints(spec: any): Finding[] {
    const findings: Finding[] = [];
    
    for (const path in spec.paths) {
      for (const method in spec.paths[path]) {
        const endpoint = spec.paths[path][method];
        
        if (!endpoint.responses['400']) {
          findings.push({
            id: `SCHEMA-001-${path}-${method}`,
            type: 'schema_validation',
            severity: 'MEDIUM',
            description: `Endpoint ${method.toUpperCase()} ${path} missing 400 error response definition`,
            remediation: 'Add 400 error response schema to handle validation errors'
          });
        }

        if (!endpoint.parameters?.some(p => p.schema)) {
          findings.push({
            id: `SCHEMA-002-${path}-${method}`,
            type: 'schema_validation',
            severity: 'HIGH',
            description: `Endpoint ${method.toUpperCase()} ${path} missing parameter schemas`,
            remediation: 'Define schemas for all input parameters'
          });
        }
      }
    }

    return findings;
  }

  private validateSchemas(spec: any): Finding[] {
    const findings: Finding[] = [];
    
    if (spec.components?.schemas) {
      for (const [name, schema] of Object.entries(spec.components.schemas)) {
        if (!this.ajv.validateSchema(schema)) {
          findings.push({
            id: `SCHEMA-003-${name}`,
            type: 'schema_validation',
            severity: 'HIGH',
            description: `Invalid schema definition for ${name}`,
            remediation: 'Fix schema to comply with JSON Schema specification'
          });
        }
      }
    }

    return findings;
  }

  private validateSecurity(spec: any): Finding[] {
    const findings: Finding[] = [];
    
    if (!spec.security) {
      findings.push({
        id: 'SCHEMA-004',
        type: 'schema_validation',
        severity: 'CRITICAL',
        description: 'API specification missing security definitions',
        remediation: 'Define security requirements in the API specification'
      });
    }

    return findings;
  }
}