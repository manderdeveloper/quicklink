import { inject, injectable } from "inversify";
import { UrlRepository } from "../../../domain/repositories/UrlRepository";

@injectable()
class ResolveUrlUseCase {
  constructor(@inject('UrlRepository') private urlRepository: UrlRepository) {}

  public async execute(id:string): Promise<string> {
    const shortenedUrl = this.getShortenedUrl(id)
    const url = await this.urlRepository.getByShortenedUrl(shortenedUrl);    
    if (!url) return null;
    return url.originalUrl.value;
  }

  private getShortenedUrl(uuid: string) {
    //TODO: Better way for get shorter url
    return `${process.env.APP_URL}/${uuid}`;
  }
}

export { ResolveUrlUseCase };
