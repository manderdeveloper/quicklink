import { inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/repositories/UserRepository";

@injectable()
class ListUserUseCase {
  constructor(@inject('UserRepository') private userRepository: UserRepository) {}

  public async execute(): Promise<any> {
    const users = await this.userRepository.getAll();
    return users.map(user => user.toPrimitives());
  }
}

export { ListUserUseCase };
