import {  injectable } from 'inversify';
import { User } from '../../../../domain/models/User';
import { UserRepository } from '../../../../domain/repositories/UserRepository';
import { AdminCreateUserCommand, AdminSetUserPasswordCommand, CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";


@injectable()
export class CognitoUserRepository implements UserRepository {
  private cognitoClient: CognitoIdentityProviderClient;
  private userPool: string;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({region: process.env.REGION,});
    this.userPool = process.env.AWS_COGNITO_USER_POOL;
  }

  async getAll(): Promise<User[]> {
    const params = {
      UserPoolId: this.userPool
    };
    const command = new ListUsersCommand(params);
    const response = await this.cognitoClient.send(command);
    const cognitoUsers = response.Users;
    const formattedUsers = cognitoUsers.filter(user => user.Enabled).map(user => {
      const email = user.Attributes.find(field => field.Name === 'email').Value;
      const id = user.Attributes.find(field => field.Name === 'custom:id').Value;
      const userName = user.Attributes.find(field => field.Name === 'custom:username').Value;
      return {
        email: email,
        username: userName,
        id: id
      }
    })
    return formattedUsers.map(user => { return User.fromPrimitives({id: user.id, email: user.email, userName: user.username, password: ''})});
  }

  async getById(id: string): Promise<User | null> {
    return Promise.resolve(null);
  }

  async getByEmail(email: string): Promise<User | null> {
    const params = {
      UserPoolId: this.userPool,
      Filter: `email = "${email}"`,
    };
    const command = new ListUsersCommand(params);
    const response = await this.cognitoClient.send(command);
    const cognitoUser = response.Users[0];
    const emailCognito = cognitoUser.Attributes.find(field => field.Name === 'email').Value;
    const idCognito = cognitoUser.Attributes.find(field => field.Name === 'custom:id').Value;
    const userName = cognitoUser.Attributes.find(field => field.Name === 'custom:username').Value;
    return User.fromPrimitives({id: idCognito, email: emailCognito, userName: userName, password: ''});
  }

  async create(user: User): Promise<void> {
    await this.createTemporaryUser(user);
    await this.setUserPassword(user);
  }

  private createTemporaryUser = async (user:User) => { 
    const params = {
      UserPoolId: this.userPool,
      Username: user.email.value,
      UserAttributes: [
        {Name: 'email', Value: user.email.value},
        {Name: 'email_verified', Value: 'true'},
        {Name: 'custom:id', Value: user.id.value},
        {Name: 'custom:username', Value: user.userName.value}
      ],
      TemporaryPassword: user.password.value,
      MessageAction: 'SUPPRESS'
    };
    const command = new AdminCreateUserCommand(params);
    try {
      await this.cognitoClient.send(command);
    } catch (error) {
      console.log(JSON.stringify(error));
      throw error;
    }
    
  }

  private setUserPassword = async (user:User) => { 
    const params = {
      UserPoolId:  this.userPool,
      Username: user.email.value,
      Password: user.password.value,
      Permanent: true
    };
    const command = new AdminSetUserPasswordCommand(params);
    try {
      await this.cognitoClient.send(command);
    } catch (error){
      console.log(JSON.stringify(error));
      throw error;
    }
  }

  async update(user: User): Promise<void> {}

  async delete(id: string): Promise<void> {}
}
