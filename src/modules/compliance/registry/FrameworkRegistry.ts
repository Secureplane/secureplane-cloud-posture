import { Logger } from '../../../utils/Logger';
import { ComplianceFramework } from '../types/AssessmentTypes';

export class FrameworkRegistry {
  private logger: Logger;
  private frameworks: Map<string, ComplianceFramework>;

  constructor() {
    this.logger = new Logger('FrameworkRegistry');
    this.frameworks = new Map();
    this.initializeBuiltInFrameworks();
  }

  async getFrameworks(): Promise<ComplianceFramework[]> {
    return Array.from(this.frameworks.values());
  }

  async getFramework(id: string): Promise<ComplianceFramework | undefined> {
    return this.frameworks.get(id);
  }

  private initializeBuiltInFrameworks(): void {
    // Initialize built-in frameworks (CIS, NIST, etc.)
    this.registerCISFrameworks();
    this.registerCloudFrameworks();
  }

  private registerCISFrameworks(): void {
    const cisFrameworks = [
      {
        id: 'cis-aws',
        name: 'CIS AWS Benchmarks',
        version: '1.4.0',
        controls: this.getCISAWSControls()
      },
      {
        id: 'cis-azure',
        name: 'CIS Azure Benchmarks',
        version: '1.3.0',
        controls: this.getCISAzureControls()
      }
    ];

    cisFrameworks.forEach(framework => {
      this.frameworks.set(framework.id, framework);
    });
  }

  private registerCloudFrameworks(): void {
    const cloudFrameworks = [
      {
        id: 'aws-security',
        name: 'AWS Security Best Practices',
        version: '1.0.0',
        controls: this.getAWSSecurityControls()
      },
      {
        id: 'azure-security',
        name: 'Azure Security Best Practices',
        version: '1.0.0',
        controls: this.getAzureSecurityControls()
      }
    ];

    cloudFrameworks.forEach(framework => {
      this.frameworks.set(framework.id, framework);
    });
  }

  private getCISAWSControls(): any[] {
    return [
      {
        id: 'CIS-AWS-1.1',
        name: 'Maintain current contact details',
        description: 'Ensure contact details are current and valid'
      },
      // Add more CIS AWS controls
    ];
  }

  private getCISAzureControls(): any[] {
    return [
      {
        id: 'CIS-AZ-1.1',
        name: 'Ensure security defaults is enabled',
        description: 'Enable security defaults in Azure Active Directory'
      },
      // Add more CIS Azure controls
    ];
  }

  private getAWSSecurityControls(): any[] {
    return [
      {
        id: 'AWS-SEC-1',
        name: 'Enable AWS CloudTrail',
        description: 'Ensure AWS CloudTrail is enabled in all regions'
      },
      // Add more AWS security controls
    ];
  }

  private getAzureSecurityControls(): any[] {
    return [
      {
        id: 'AZ-SEC-1',
        name: 'Enable Azure Monitor',
        description: 'Ensure Azure Monitor is configured properly'
      },
      // Add more Azure security controls
    ];
  }
}