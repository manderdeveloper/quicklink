import { User } from '../models/User';
import { BaseRepository } from './BaseRepository';

export interface UserRepository extends BaseRepository<User> {
  getByEmail(email: string): Promise<User | null>;
}
