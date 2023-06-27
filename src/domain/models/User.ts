import { UrlString } from "../valueObjects/url/UrlString";
import { UserEmail } from "../valueObjects/user/UserEmail";
import { UserId } from "../valueObjects/user/UserId";
import { UserName } from "../valueObjects/user/UserName";
import { UserPassword } from "../valueObjects/user/UserPassword";

export class User {
  readonly id: UserId;
  readonly email: UserEmail;
  readonly userName: UserName;
  readonly password: UserPassword;

  constructor (id: UserId, email: UserEmail, userName: UserName, password: UserPassword) {
    this.id = id;
    this.email = email;
    this.userName = userName;
    this.password = password;
  }

  static fromPrimitives(plainData: { id: string, email: string, userName: string, password: string}): User {
    return new User(
      new UserId(plainData.id),
      new UserEmail(plainData.email),
      new UserName(plainData.userName),
      new UserPassword(plainData.password)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      email: this.email.value,
      userName: this.userName.value
    };
  }

}