import { Request, Response, NextFunction } from 'express';
import container from '../../injection/container';
import { Logger } from './Logger';

function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const logger = container.get<Logger>('Logger');
  logger.info(JSON.stringify(error));

  res.status(500).json({ error: 'Internal Server Error' });
}

export { errorHandlerMiddleware };
