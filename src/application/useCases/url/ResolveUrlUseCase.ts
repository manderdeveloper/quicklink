import { inject, injectable } from "inversify";
import { UrlRepository } from "../../../domain/repositories/UrlRepository";
import { CacheUrlRepository } from "../../../domain/cache/UrlCacheRepository";

@injectable()
class ResolveUrlUseCase {
  constructor(
    @inject('UrlRepository') private urlRepository: UrlRepository,
    @inject('CacheUrlRepository') private urlCache: CacheUrlRepository
    ) {}

  public async execute(id:string): Promise<string> {
    const cachedUrl = await this.urlCache.get(id);
    if (cachedUrl) {
      return cachedUrl.originalUrl.value;
    }

    const shortenedUrl = this.getShortenedUrl(id)
    const url = await this.urlRepository.getByShortenedUrl(shortenedUrl);    
    if (!url) return null;
    await this.urlCache.set(id, url);
    return url.originalUrl.value;
  }

  private getShortenedUrl(uuid: string) {
    //TODO: Better way for get shorter url
    return `${process.env.APP_URL}/${uuid}`;
  }
}

export { ResolveUrlUseCase };
