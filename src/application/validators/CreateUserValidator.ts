import { body } from 'express-validator';

class CreateUserValidator {
  public static validateCreateUser() {
    return [
      body('id').notEmpty().isUUID(),
      body('email').notEmpty().isEmail(),
      body('userName').notEmpty(),
      body('password').notEmpty().isStrongPassword({
        minLength:8,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1,
      })
    ];
  }
}

export { CreateUserValidator };
