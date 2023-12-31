import { inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../domain/services/AuthService';
import { controller, httpPost } from 'inversify-express-utils';

@controller('/api/auth')
export class AuthController {
  constructor(@inject('AuthService') private authService: AuthService) {}

  @httpPost('/login')
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
      next(error);
    }
  }
}