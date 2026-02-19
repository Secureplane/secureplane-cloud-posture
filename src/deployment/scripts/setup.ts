import { Logger } from '../../utils/logger';
import { ConfigService } from '../../config/services/ConfigService';
import { DeploymentManager } from '../services/DeploymentManager';
import { KubernetesService } from '../services/KubernetesService';
import { MonitoringService } from '../services/MonitoringService';

export class PlatformSetup {
  private logger: Logger;
  private configService: ConfigService;
  private deploymentManager: DeploymentManager;
  private kubernetesService: KubernetesService;
  private monitoringService: MonitoringService;

  constructor() {
    this.logger = new Logger();
    this.configService = new ConfigService();
    this.deploymentManager = new DeploymentManager();
    this.kubernetesService = new KubernetesService();
    this.monitoringService = new MonitoringService();
  }

  async initialize(environment: string): Promise<void> {
    try {
      this.logger.info(`Initializing Wiz platform for ${environment} environment`);

      // Load environment configuration
      const config = await this.configService.loadConfig(`config/${environment}.yaml`);

      // Initialize core services
      await this.initializeCoreServices(config);

      // Deploy Kubernetes resources
      await this.deployKubernetesResources(config);

      // Setup monitoring and alerting
      await this.setupMonitoring(config);

      this.logger.info('Platform initialization completed successfully');
    } catch (error) {
      this.logger.error(`Platform initialization failed: ${error.message}`);
      throw error;
    }
  }

  private async initializeCoreServices(config: any): Promise<void> {
    await this.deploymentManager.deployCoreComponents({
      cspm: config.modules.cspm,
      cwpp: config.modules.cwpp,
      dspm: config.modules.dspm,
      iac: config.modules.iac
    });
  }

  private async deployKubernetesResources(config: any): Promise<void> {
    await this.kubernetesService.createNamespace('wiz-system');
    await this.kubernetesService.applyManifests([
      'kubernetes/wiz/namespace.yaml',
      'kubernetes/wiz/configmap.yaml',
      'kubernetes/wiz/deployment.yaml',
      'kubernetes/wiz/service.yaml',
      'kubernetes/wiz/networkpolicy.yaml',
      'kubernetes/wiz/rbac.yaml'
    ]);
  }

  private async setupMonitoring(config: any): Promise<void> {
    await this.monitoringService.initialize({
      alerting: config.monitoring.alerts,
      metrics: config.monitoring.metrics,
      logging: config.monitoring.logging
    });
  }
}