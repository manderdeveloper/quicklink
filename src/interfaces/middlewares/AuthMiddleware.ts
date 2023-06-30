import { Response, NextFunction } from 'express';
import { AuthService } from '../../domain/services/AuthService';
import { container } from '../../injection/containerBase';
import { UserRequest } from '../../shared/models/Request';
import { BadRequestError } from '../../shared/errors/BadRequest';

function validationAuthMiddleware() {
  return async function (req: UserRequest, res: Response, next: NextFunction) {
    const authService = container.get<AuthService>('AuthService');
    const token = req.headers.authorization?.split(' ')[1];
      if (!token) return new BadRequestError('Access Token is required');
      try {
        const user = await authService.validateAuthToken(token);
        req.user = user;
        next();
      } catch (error) {
        return new BadRequestError('Access Token is not valid');
      }
  };
}

export { validationAuthMiddleware };
