import { z } from 'zod';

export const ApiScanConfigSchema = z.object({
  authentication: z.object({
    required: z.boolean(),
    methods: z.array(z.string()),
    jwt: z.object({
      algorithms: z.array(z.string()),
      minKeySize: z.number()
    }).optional()
  }),
  authorization: z.object({
    rbacRequired: z.boolean(),
    scopeValidation: z.boolean()
  }),
  rateLimit: z.object({
    required: z.boolean(),
    defaultRate: z.number(),
    burstSize: z.number()
  }),
  securityHeaders: z.object({
    required: z.array(z.string()),
    cors: z.object({
      allowedOrigins: z.array(z.string()),
      allowedMethods: z.array(z.string()),
      allowCredentials: z.boolean()
    })
  }),
  validation: z.object({
    inputRequired: z.boolean(),
    outputRequired: z.boolean(),
    schemaValidation: z.boolean()
  }),
  graph: z.object({
    maxDepth: z.number(),
    includeIndirectRelationships: z.boolean()
  }),
  reporting: z.object({
    format: z.enum(['json', 'html', 'pdf']),
    includeRecommendations: z.boolean()
  })
});

export type ApiScanConfig = z.infer<typeof ApiScanConfigSchema>;

export const defaultConfig: ApiScanConfig = {
  authentication: {
    required: true,
    methods: ['jwt', 'oauth2'],
    jwt: {
      algorithms: ['RS256', 'ES256'],
      minKeySize: 2048
    }
  },
  authorization: {
    rbacRequired: true,
    scopeValidation: true
  },
  rateLimit: {
    required: true,
    defaultRate: 100,
    burstSize: 10
  },
  securityHeaders: {
    required: [
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection',
      'Strict-Transport-Security'
    ],
    cors: {
      allowedOrigins: [],
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowCredentials: false
    }
  },
  validation: {
    inputRequired: true,
    outputRequired: true,
    schemaValidation: true
  },
  graph: {
    maxDepth: 5,
    includeIndirectRelationships: true
  },
  reporting: {
    format: 'json',
    includeRecommendations: true
  }
};