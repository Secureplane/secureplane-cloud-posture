export interface Component {
  id: string;
  name: string;
  version: string;
  type: 'library' | 'framework' | 'runtime';
  license: string;
  dependencies?: string[];
}

export interface SBOM {
  components: Component[];
  dependencies: DependencyGraph;
  vulnerabilities: VulnerabilityResult[];
  metadata: {
    generated: Date;
    format: string;
    version: string;
  };
}

export interface VulnerabilityResult {
  componentId: string;
  vulnerabilities: any[];
  riskScore: number;
  recommendations: string[];
  timestamp: Date;
}

export interface DependencyGraph {
  nodes: any[];
  edges: any[];
  metadata: {
    totalComponents: number;
    directDependencies: number;
    timestamp: Date;
  };
}