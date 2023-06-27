import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

function validationMiddleware(validations: ValidationChain[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.status(400).json({ errors: errors.array() });
    }
  };
}

export { validationMiddleware };
