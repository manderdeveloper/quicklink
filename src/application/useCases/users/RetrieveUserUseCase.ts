import { inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UrlRepository } from "../../../domain/repositories/UrlRepository";

@injectable()
class RetrieveUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('UrlRepository') private urlRepository: UrlRepository
    ) {}

  public async execute(id:string): Promise<any> {
    const user = await this.userRepository.getById(id);
    const primitiveUser = user.toPrimitives();
    const urls = await this.urlRepository.getAll();
    const userUrls = urls.filter(url => url.userId.value === user.id.value).map(url => url.toPrimitives());
    primitiveUser['urls'] = userUrls;
    return primitiveUser;
  }
}

export { RetrieveUserUseCase };
