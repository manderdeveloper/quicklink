import { inject, injectable } from "inversify";
import { User } from "../../../domain/models/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateUserBody } from "./body/CreateUserBody";

@injectable()
class CreateUserUseCase {
  constructor(@inject('UserRepository') private userRepository: UserRepository) {}

  public async execute(body: CreateUserBody): Promise<User> {
    const user = User.fromPrimitives({...body});
    await this.userRepository.create(user);
    return user;
  }
}

export { CreateUserUseCase };
