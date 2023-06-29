import { CognitoIdentityProviderClient, AdminInitiateAuthCommand, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { AuthService } from "../../../domain/services/AuthService";
import { User } from "../../../domain/models/User";
import { injectable } from "inversify";
import { createHmac } from 'crypto';

@injectable()
export class CognitoAuthService implements AuthService {
  private cognitoClient: CognitoIdentityProviderClient;
  private clientId: string;
  private userPool: string;
  private clientSecret: string;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({region: process.env.REGION,});
    this.clientId = process.env.AWS_COGNITO_CLIENT_ID;
    this.userPool = process.env.AWS_COGNITO_USER_POOL;
    this.clientSecret = process.env.AWS_COGNITO_CLIENT_SECRET;
  }

  async login(email: string, password: string): Promise<any> {
    const params = {
    AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
    ClientId: this.clientId,
    UserPoolId: this.userPool,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: this.calculateSecretHash(email)
    },
  };

    try {
      const command = new AdminInitiateAuthCommand(params);
      const response = await this.cognitoClient.send(command);
      return response.AuthenticationResult.AccessToken;
    } catch (error) {
      console.log(JSON.stringify(error));
      throw new Error('Invalid login credentials');
    }
  }

  private calculateSecretHash(email: string): string {
    const data = email + this.clientId;
    const secretHash = createHmac('sha256', this.clientSecret).update(data).digest('base64');
    return secretHash; 
  }

  async validateAuthToken(authToken: string): Promise<User> {
    const params = {
      AccessToken: authToken
    };

    const response = await this.cognitoClient.send(new GetUserCommand(params));
    const userAttributes = response.UserAttributes;
    const emailCognito = userAttributes.find(field => field.Name === 'email').Value;
    const idCognito = userAttributes.find(field => field.Name === 'custom:id').Value;
    const userName = userAttributes.find(field => field.Name === 'custom:username').Value;
    return User.fromPrimitives({id: idCognito, email: emailCognito, userName: userName, password: ''});
  }
}
