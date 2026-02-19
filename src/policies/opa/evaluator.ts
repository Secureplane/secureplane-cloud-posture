import { Logger } from '../../utils/logger';
import { loadPolicy } from '@open-policy-agent/opa-wasm';

export class PolicyEvaluator {
    private logger: Logger;

    constructor() {
        this.logger = new Logger('PolicyEvaluator');
    }

    async evaluatePolicy(policyWasm: Buffer, input: any): Promise<any> {
        try {
            this.logger.info('Evaluating OPA policy');
            
            // Load the policy
            const policy = await loadPolicy(policyWasm);
            
            // Set the data and evaluate
            const result = await policy.evaluate(input);
            
            this.logger.info('Policy evaluation completed');
            return result;
        } catch (error) {
            this.logger.error(`Policy evaluation failed: ${error.message}`);
            throw error;
        }
    }
}