import { Logger } from '../../utils/logger';
import * as k8s from '@kubernetes/client-node';
import { promises as fs } from 'fs';
import * as yaml from 'yaml';

export class KubernetesService {
  private logger: Logger;
  private k8sApi: k8s.CoreV1Api;

  constructor() {
    this.logger = new Logger();
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    this.k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  }

  async createNamespace(name: string): Promise<void> {
    try {
      this.logger.info(`Creating namespace: ${name}`);
      await this.k8sApi.createNamespace({
        metadata: {
          name
        }
      });
    } catch (error) {
      if (error.response?.statusCode !== 409) {
        throw error;
      }
    }
  }

  async applyManifests(manifestPaths: string[]): Promise<void> {
    for (const path of manifestPaths) {
      try {
        this.logger.info(`Applying manifest: ${path}`);
        const content = await fs.readFile(path, 'utf8');
        const resources = yaml.parseAllDocuments(content);

        for (const resource of resources) {
          await this.applyResource(resource.toJSON());
        }
      } catch (error) {
        this.logger.error(`Failed to apply manifest ${path}: ${error.message}`);
        throw error;
      }
    }
  }

  private async applyResource(resource: any): Promise<void> {
    const client = this.getApiClientForResource(resource);
    try {
      await client.create(resource);
    } catch (error) {
      if (error.response?.statusCode === 409) {
        await client.patch(
          resource.metadata.name,
          resource.metadata.namespace,
          resource
        );
      } else {
        throw error;
      }
    }
  }

  private getApiClientForResource(resource: any): any {
    // Implement API client selection based on resource kind
    return this.k8sApi;
  }
}