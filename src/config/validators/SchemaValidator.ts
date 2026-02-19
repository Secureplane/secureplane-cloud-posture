import { z } from 'zod';

export class SchemaValidator {
  static createStringSchema(options: { required?: boolean; url?: boolean } = {}) {
    let schema = z.string();
    
    if (options.url) {
      schema = schema.url();
    }
    
    return options.required ? schema : schema.optional();
  }

  static createNumberSchema(options: { min?: number; max?: number; required?: boolean } = {}) {
    let schema = z.number();
    
    if (typeof options.min === 'number') {
      schema = schema.min(options.min);
    }
    
    if (typeof options.max === 'number') {
      schema = schema.max(options.max);
    }
    
    return options.required ? schema : schema.optional();
  }

  static createBooleanSchema(required = false) {
    const schema = z.boolean();
    return required ? schema : schema.optional();
  }

  static createEnumSchema<T extends readonly [string, ...string[]]>(
    values: T,
    required = false
  ) {
    const schema = z.enum(values);
    return required ? schema : schema.optional();
  }
}