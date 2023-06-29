// Middleware/AuthMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { AuthService } from '../../domain/services/AuthService';
import { container } from '../../injection/containerBase';
import { UserRequest } from '../../shared/models/Request';

@injectable()
export class AuthMiddleware {
  constructor(
    @inject('AuthService') private authService: AuthService,
  ) {}

  public validateToken() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'No se proporcionó un token de acceso' });
      try {
        const user = await this.authService.validateAuthToken(token);
        //req.user = decodedToken;
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
      }
    };
  }
}

function validationAuthMiddleware() {
  return async function (req: UserRequest, res: Response, next: NextFunction) {
    const authService = container.get<AuthService>('AuthService');
    const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'No se proporcionó un token de acceso' });
      try {
        const user = await authService.validateAuthToken(token);
        req.user = user;
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
      }
  };
}

export { validationAuthMiddleware };
