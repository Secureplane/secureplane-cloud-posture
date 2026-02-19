import { WizConfig } from '../types/ConfigTypes';

export class ConfigCache {
  private static instance: ConfigCache;
  private cache: Map<string, WizConfig>;
  private ttl: number;

  constructor(ttl: number = 3600000) { // 1 hour default TTL
    this.cache = new Map();
    this.ttl = ttl;
  }

  static getInstance(): ConfigCache {
    if (!ConfigCache.instance) {
      ConfigCache.instance = new ConfigCache();
    }
    return ConfigCache.instance;
  }

  set(config: WizConfig): void {
    const key = this.getCacheKey();
    this.cache.set(key, config);
    setTimeout(() => this.cache.delete(key), this.ttl);
  }

  get(): WizConfig | null {
    const key = this.getCacheKey();
    return this.cache.get(key) || null;
  }

  clear(): void {
    this.cache.clear();
  }

  private getCacheKey(): string {
    return 'wiz-config';
  }
}