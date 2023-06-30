import { NextFunction, Request, Response } from "express";
import { controller, httpGet, httpPost, Middleware, next } from "inversify-express-utils";
import { CreateUserBody } from "../../application/useCases/users/body/CreateUserBody";
import { inject } from "inversify";
import { USECASETYPES } from "../../shared/types/UseCaseTypes";
import { CreateUserUseCase } from "../../application/useCases/users/CreateUserUseCase";
import { ListUserUseCase } from "../../application/useCases/users/ListUserUseCase";
import { RetrieveUserUseCase } from "../../application/useCases/users/RetrieveUserUseCase";
import { validationMiddleware } from "../middlewares/Validation";
import { CreateUserValidator } from "../../application/validators/CreateUserValidator";
import {  validationAuthMiddleware } from "../middlewares/AuthMiddleware";
import { UserRequest } from "../../shared/models/Request";
import { validationAdminApiKey } from "../middlewares/AdminApiKeyMiddleware";

@controller('/api/users')
export class UserController {
  constructor(
    @inject(USECASETYPES.CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
    @inject(USECASETYPES.ListUserUseCase) private listUserUseCase: ListUserUseCase,
    @inject(USECASETYPES.RetrieveUserUseCase) private retrieveUserUseCase: RetrieveUserUseCase
  ) {}

  @httpPost('/', validationAdminApiKey(), validationMiddleware(CreateUserValidator.validateCreateUser()))
  async create(req: Request, res: Response, next: NextFunction) {
    try {

      const body: CreateUserBody = req.body;
      await this.createUserUseCase.execute(body);
      return res.status(201).json({message: 'Created'});

    } catch (error) {
      next(error);
    }
  }

  @httpGet('/', validationAdminApiKey())
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.listUserUseCase.execute();
      return res.status(201).json(users);

    } catch (error) {
      next(error);
    }
  }

  @httpGet('/:email', validationAuthMiddleware())
  async retrieve(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      if (email !== req.user.email.value) throw new Error('FORBIDDEN');
      const userUseCase = await this.retrieveUserUseCase.execute(email);
      return res.status(201).json(userUseCase);

    } catch (error) {
      next(error);
    }
  }
  
}