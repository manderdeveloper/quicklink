import { v4 as uuid, validate } from 'uuid';

import { InvalidArgumentError } from './InvalidArgumentError';
import { ValueObject } from './ValueObject';

export class UuidValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }

  static random(): UuidValueObject {
    return new UuidValueObject(uuid());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
    }
  }
}
