import { injectable } from 'inversify';
import { User } from '../../../domain/models/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';

@injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  getAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  getById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id.value === id);
    return Promise.resolve(user || null);
  }

  create(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }

  update(user: User): Promise<void> {
    const index = this.users.findIndex((user) => user.id.value === user.id.value);
    if (index !== -1) {
      this.users[index] = user;
    }
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id.value === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return Promise.resolve();
  }
}
