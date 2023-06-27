import { injectable } from 'inversify';
import { Logger } from '../../interfaces/middlewares/Logger';

@injectable()
export class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
  info(message: string) {
    console.info(message);
  }
  warning(message: string) {
    console.warn(message);
  }
  error(message: string) {
    console.error(message);
  }
}