export interface CacheRepository<T> {
  get(key: string): Promise<T>;
  set(key: string, model: T): Promise<void>;
  remove(key: string): Promise<void>;
}
