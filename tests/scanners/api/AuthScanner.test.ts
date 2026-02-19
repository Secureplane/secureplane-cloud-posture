import { AuthScanner } from '../../../src/scanners/api/scanners/AuthScanner';
import { AuthConfig } from '../../../src/scanners/api/types/AuthTypes';
import { ScanError } from '../../../src/scanners/api/errors/ScanError';

describe('AuthScanner', () => {
  let scanner: AuthScanner;
  let mockConfig: AuthConfig;

  beforeEach(() => {
    scanner = new AuthScanner();
    mockConfig = {
      jwt: {
        requiredAlgorithms: ['RS256'],
        minKeySize: 2048
      },
      oauth: {
        requiredFlows: ['authorization_code']
      },
      mfa: {
        required: true
      }
    };
  });

  describe('scan', () => {
    it('should throw ScanError when apiSpec is missing', async () => {
      await expect(scanner.scan('', mockConfig))
        .rejects
        .toThrow(ScanError);
    });

    it('should return complete scan results', async () => {
      const apiSpec = 'valid-api-spec';
      const result = await scanner.scan(apiSpec, mockConfig);

      expect(result).toHaveProperty('jwtConfig');
      expect(result).toHaveProperty('oauth');
      expect(result).toHaveProperty('mfa');
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('JWT validation', () => {
    it('should detect unsafe JWT algorithms', async () => {
      const apiSpec = 'api-spec-with-unsafe-jwt';
      const result = await scanner.scan(apiSpec, mockConfig);

      expect(result.jwtConfig.findings).toContainEqual(
        expect.objectContaining({
          severity: 'HIGH',
          message: expect.stringContaining('Unsafe JWT algorithms detected')
        })
      );
    });

    it('should validate JWT key size', async () => {
      const apiSpec = 'api-spec-with-weak-key';
      const result = await scanner.scan(apiSpec, mockConfig);

      expect(result.jwtConfig.findings).toContainEqual(
        expect.objectContaining({
          severity: 'HIGH',
          message: expect.stringContaining('JWT key size')
        })
      );
    });
  });

  describe('OAuth validation', () => {
    it('should validate required OAuth flows', async () => {
      const apiSpec = 'api-spec-missing-flows';
      const result = await scanner.scan(apiSpec, mockConfig);

      expect(result.oauth.findings).toContainEqual(
        expect.objectContaining({
          severity: 'HIGH',
          message: expect.stringContaining('Missing required OAuth flows')
        })
      );
    });

    it('should validate OAuth scope definitions', async () => {
      const apiSpec = 'api-spec-invalid-scopes';
      const result = await scanner.scan(apiSpec, mockConfig);

      expect(result.oauth.findings).toContainEqual(
        expect.objectContaining({
          severity: 'MEDIUM',
          message: expect.stringContaining('OAuth scopes')
        })
      );
    });
  });

  describe('MFA validation', () => {
    it('should enforce MFA when required', async () => {
      const apiSpec = 'api-spec-without-mfa';
      const result = await scanner.scan(apiSpec, mockConfig);

      expect(result.mfa.findings).toContainEqual(
        expect.objectContaining({
          severity: 'CRITICAL',
          message: expect.stringContaining('MFA is required but not implemented')
        })
      );
    });

    it('should detect MFA implementation weaknesses', async () => {
      const apiSpec = 'api-spec-weak-mfa';
      const result = await scanner.scan(apiSpec, mockConfig);

      expect(result.mfa.findings).toContainEqual(
        expect.objectContaining({
          severity: 'HIGH',
          message: expect.stringContaining('MFA weakness detected')
        })
      );
    });
  });
});