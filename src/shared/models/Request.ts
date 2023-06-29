import { Request } from "express"
import { User } from "../../domain/models/User"

export interface UserRequest extends Request {
  user: User
}