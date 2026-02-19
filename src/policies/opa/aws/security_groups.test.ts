import { PolicyEvaluator } from '../evaluator';
import { readFileSync } from 'fs';
import path from 'path';

describe('AWS Security Group Policy Tests', () => {
    let evaluator: PolicyEvaluator;
    let policyWasm: Buffer;

    beforeAll(() => {
        evaluator = new PolicyEvaluator();
        policyWasm = readFileSync(path.join(__dirname, 'security_groups.wasm'));
    });

    test('should fail when security group allows unrestricted outbound traffic', async () => {
        const input = {
            IpPermissionsEgress: [{
                IpRanges: [{ CidrIp: '0.0.0.0/0' }]
            }]
        };

        const result = await evaluator.evaluatePolicy(policyWasm, input);
        expect(result[0].result).toBe('fail');
    });

    test('should pass when security group restricts outbound traffic', async () => {
        const input = {
            IpPermissionsEgress: [{
                IpRanges: [{ CidrIp: '10.0.0.0/8' }]
            }]
        };

        const result = await evaluator.evaluatePolicy(policyWasm, input);
        expect(result[0].result).toBe('pass');
    });
});