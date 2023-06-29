import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CreateUserBody } from "../../application/useCases/users/body/CreateUserBody";
import { inject } from "inversify";
import { USECASETYPES } from "../../shared/types/UseCaseTypes";
import { CreateUserUseCase } from "../../application/useCases/users/CreateUserUseCase";
import { ListUserUseCase } from "../../application/useCases/users/ListUserUseCase";
import { RetrieveUserUseCase } from "../../application/useCases/users/RetrieveUserUseCase";
import { validationMiddleware } from "../middlewares/Validation";
import { CreateUserValidator } from "../../application/validators/CreateUserValidator";

@controller('/api/users')
export class UserController {
  constructor(
    @inject(USECASETYPES.CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
    @inject(USECASETYPES.ListUserUseCase) private listUserUseCase: ListUserUseCase,
    @inject(USECASETYPES.RetrieveUserUseCase) private retrieveUserUseCase: RetrieveUserUseCase
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

  @httpGet('/:email')
  async retrieve(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const user = await this.retrieveUserUseCase.execute(email);
      return res.status(201).json(user);

    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving user' });
    }
  }
  
}