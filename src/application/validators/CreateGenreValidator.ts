import { body } from 'express-validator';

class CreateGenreValidator {
  public static validateCreateGenre() {
    return [
      body('name').notEmpty(),
      body('id').notEmpty().isUUID()
    ];
  }
}

export { CreateGenreValidator };
