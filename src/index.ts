import 'reflect-metadata';
require('dotenv').config({ path: `./environments/${process.env.NODE_ENV}.env` })
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './injection/container';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { errorHandlerMiddleware } from './interfaces/middlewares/ErrorHandler';

const server = new InversifyExpressServer(container, null, {rootPath: '/api'});

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(
    (
      error: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      errorHandlerMiddleware(error, req, res, next);
    }
  )
});

server.setErrorConfig((app) => {
  app.use((err:any, req:any, res:any, next:any) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });
});

const app = server.build();
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
