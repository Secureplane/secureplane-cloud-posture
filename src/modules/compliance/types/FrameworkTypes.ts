export interface FrameworkConfig {
  name: string;
  description: string;
  controls: ControlConfig[];
  owner: string;
}

export interface ControlConfig {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  validation: string[];
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  controls: Control[];
  metadata: FrameworkMetadata;
}

export interface Control {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  validation: string[];
}

export interface FrameworkMetadata {
  created: Date;
  version: string;
  owner: string;
}