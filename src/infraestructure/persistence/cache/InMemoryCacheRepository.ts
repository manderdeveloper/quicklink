import { injectable } from "inversify";
import { CacheRepository } from "../../../domain/cache/CacheRepository";
import { Url } from "../../../domain/models/Url";

@injectable()
export class InMeMoryCacheRepository implements CacheRepository<Url> {
  private cache: Map<string, Url>;
  
  constructor() {
    this.cache = new Map<string, Url>();
  }

  async get(key: string): Promise<Url> {
    const cachedUrl = this.cache.get(key);
    return Promise.resolve(cachedUrl ?? null);
  }
  async set(key: string, url: Url): Promise<void> {
    this.cache.set(key, url);
  }
  async remove(key: string): Promise<void> {
    this.cache.delete(key);
  }
  
}