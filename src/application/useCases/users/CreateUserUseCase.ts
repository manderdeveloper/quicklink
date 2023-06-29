import { inject, injectable } from "inversify";
import { User } from "../../../domain/models/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateUserBody } from "./body/CreateUserBody";

@injectable()
class CreateUserUseCase {
  constructor(@inject('UserRepository') private userRepository: UserRepository) {}

  public async execute(body: CreateUserBody): Promise<User> {
    const users = await this.userRepository.getAll();
    const existsEmail = users.find(user => user.email.value === body.email);
    const existUserName = users.find(user => user.userName.value === body.userName);
    const existUserId = users.find(user => user.id.value === body.id);
    if (existsEmail) throw new Error('The email already exists');
    if (existUserName) throw new Error('The username already exists');
    if (existUserId) throw new Error('The id already exists');
    
    const user = User.fromPrimitives({...body});
    await this.userRepository.create(user);
    return user;
  }
}

export { CreateUserUseCase };
