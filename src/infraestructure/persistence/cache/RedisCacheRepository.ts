import Redis from "ioredis";
import { injectable } from "inversify";
import { CacheRepository } from "../../../domain/cache/CacheRepository";
import { Url } from "../../../domain/models/Url";

@injectable()
export class RedisCacheRepository implements CacheRepository<Url> {
  private cache: Redis;

  constructor() {
    const redisOptions: {host:any, port:any} = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    };
    
    this.cache = new Redis(redisOptions);
  }

  async get(key: string): Promise<Url | null> {
    const cachedUrl = await this.cache.get(key);
    if (cachedUrl) {
      return JSON.parse(cachedUrl) as Url;
    }
    return null;
  }

  async set(key: string, url: Url): Promise<void> {
    await this.cache.set(key, JSON.stringify(url));
  }

  async remove(key: string): Promise<void> {
    await this.cache.del(key);
  }
}
