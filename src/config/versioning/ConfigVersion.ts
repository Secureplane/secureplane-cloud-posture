export interface ConfigVersion {
  major: number;
  minor: number;
  patch: number;
  timestamp: Date;
}

export class ConfigVersioning {
  static getCurrentVersion(): ConfigVersion {
    return {
      major: 1,
      minor: 0,
      patch: 0,
      timestamp: new Date()
    };
  }

  static isCompatible(version: ConfigVersion): boolean {
    const current = this.getCurrentVersion();
    return version.major === current.major;
  }

  static formatVersion(version: ConfigVersion): string {
    return `${version.major}.${version.minor}.${version.patch}`;
  }
}