import { inject, injectable } from "inversify";
import { CreateUrlBody } from "./body/CreateUrlBody";
import { Url } from "../../../domain/models/Url";
import { UrlRepository } from "../../../domain/repositories/UrlRepository";
import {v4 as uuidv4} from 'uuid';

@injectable()
class CreateUrlUseCase {
  constructor(@inject('UrlRepository') private urlRepository: UrlRepository) {}

  public async execute(body: CreateUrlBody): Promise<void> {
    const shortenedUrl = this.getShortenedUrl();
    const url = Url.fromPrimitives({...body, shortenedUrl: shortenedUrl});
    await this.urlRepository.create(url);    
  }

  private getShortenedUrl() {
    //TODO: Better way for get shorter url
    return `${process.env.APP_URL}/${uuidv4()}`;
  }
}

export { CreateUrlUseCase };
