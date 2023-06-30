import { Response, NextFunction } from 'express';
import { UserRequest } from '../../shared/models/Request';
import { BadRequestError } from '../../shared/errors/BadRequest';

function validationAdminApiKey() {
  return async function (req: UserRequest, res: Response, next: NextFunction) {
    const apiKey = req.headers[process.env.ADMIN_API_KEY.toLowerCase()];
      if (!apiKey) return new BadRequestError('Api Key is required');
      if (apiKey !== process.env.ADMIN_API_KEY_VALUE) return new BadRequestError('Api Key is not valid');
      next();
  };
}

export { validationAdminApiKey };
