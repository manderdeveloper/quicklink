import { id, injectable } from 'inversify';
import { UrlRepository } from '../../../domain/repositories/UrlRepository';
import { Url } from '../../../domain/models/Url';

@injectable()
export class InMemoryUrlRepository implements UrlRepository {
  private urls: Url[] = [];

  getAll(): Promise<Url[]> {
    return Promise.resolve(this.urls);
  }

  getById(id: string): Promise<Url | null> {
    const url = this.urls.find((url) => url.id.value === id);
    return Promise.resolve(url || null);
  }

  getByShortenedUrl(shortenedUrl: string): Promise<Url | null> {
    const url = this.urls.find((url) => url.shortenedUrl.value === shortenedUrl);
    return Promise.resolve(url || null);
  }

  create(url: Url): Promise<void> {
    this.urls.push(url);
    return Promise.resolve();
  }

  update(url: Url): Promise<void> {
    const index = this.urls.findIndex((url) => url.id.value === url.id.value);
    if (index !== -1) {
      this.urls[index] = url;
    }
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    const index = this.urls.findIndex((url) => url.id.value === id);
    if (index !== -1) {
      this.urls.splice(index, 1);
    }
    return Promise.resolve();
  }
}
