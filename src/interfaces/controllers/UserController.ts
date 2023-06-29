import { Request, Response } from "express";
import { controller, httpGet, httpPost, Middleware, next } from "inversify-express-utils";
import { CreateUserBody } from "../../application/useCases/users/body/CreateUserBody";
import { inject } from "inversify";
import { USECASETYPES } from "../../shared/types/UseCaseTypes";
import { CreateUserUseCase } from "../../application/useCases/users/CreateUserUseCase";
import { ListUserUseCase } from "../../application/useCases/users/ListUserUseCase";
import { RetrieveUserUseCase } from "../../application/useCases/users/RetrieveUserUseCase";
import { validationMiddleware } from "../middlewares/Validation";
import { CreateUserValidator } from "../../application/validators/CreateUserValidator";
import { AuthMiddleware, validationAuthMiddleware } from "../middlewares/AuthMiddleware";
import { MIDDLEWARETYPES } from "../../shared/types/MiddlewareTypes";
import { AuthService } from "../../domain/services/AuthService";
import { UserRequest } from "../../shared/models/Request";

@controller('/api/users')
export class UserController {
  constructor(
    @inject(USECASETYPES.CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
    @inject(USECASETYPES.ListUserUseCase) private listUserUseCase: ListUserUseCase,
    @inject(USECASETYPES.RetrieveUserUseCase) private retrieveUserUseCase: RetrieveUserUseCase,
    @inject(MIDDLEWARETYPES.AuthMiddleware) private authMiddleware: AuthMiddleware,
    @inject('AuthService') private authService: AuthService
  ) {}

  @httpPost('/', validationMiddleware(CreateUserValidator.validateCreateUser()))
  async create(req: Request, res: Response) {
    try {

      const body: CreateUserBody = req.body;
      await this.createUserUseCase.execute(body);
      return res.status(201).json({message: 'Created'});

    } catch (error) {
      throw error;
    }
  }

  @httpGet('/')
  async list(req: Request, res: Response) {
    try {
      const users = await this.listUserUseCase.execute();
      return res.status(201).json(users);

    } catch (error) {
      return res.status(500).json({ message: 'Error list user' });
    }
  }

  @httpGet('/:email', validationAuthMiddleware())
  async retrieve(req: UserRequest, res: Response) {
    try {
      const { email } = req.params;
      if (email !== req.user.email.value) throw new Error('FORBIDDEN');
      const userUseCase = await this.retrieveUserUseCase.execute(email);
      return res.status(201).json(userUseCase);

    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving user' });
    }
  }
  
}