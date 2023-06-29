import { User } from "../models/User";

export interface AuthService {
  login(email: string, password: string): Promise<string>;
  validateAuthToken(authToken: string): Promise<User>;
}