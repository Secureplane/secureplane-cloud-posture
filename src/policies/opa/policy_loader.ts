import { Logger } from '../../utils/logger';
import { promises as fs } from 'fs';
import path from 'path';
import { PolicyEvaluator } from './evaluator';

export class PolicyLoader {
    private logger: Logger;
    private evaluator: PolicyEvaluator;
    private policies: Map<string, Buffer>;

    constructor() {
        this.logger = new Logger('PolicyLoader');
        this.evaluator = new PolicyEvaluator();
        this.policies = new Map();
    }

    async loadPolicies(policyDir: string): Promise<void> {
        try {
            this.logger.info('Loading OPA policies');
            
            const files = await fs.readdir(policyDir, { recursive: true });
            const wasmFiles = files.filter(file => file.endsWith('.wasm'));
            
            for (const file of wasmFiles) {
                const policyPath = path.join(policyDir, file);
                const policyId = this.getPolicyId(file);
                const policyWasm = await fs.readFile(policyPath);
                this.policies.set(policyId, policyWasm);
            }
            
            this.logger.info(`Loaded ${this.policies.size} policies`);
        } catch (error) {
            this.logger.error(`Failed to load policies: ${error.message}`);
            throw error;
        }
    }

    async evaluatePolicy(policyId: string, input: any): Promise<any> {
        const policy = this.policies.get(policyId);
        if (!policy) {
            throw new Error(`Policy not found: ${policyId}`);
        }
        
        return this.evaluator.evaluatePolicy(policy, input);
    }

    private getPolicyId(filename: string): string {
        return path.basename(filename, '.wasm');
    }
}