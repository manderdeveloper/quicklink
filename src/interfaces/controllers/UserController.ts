import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CreateUserBody } from "../../application/useCases/users/body/CreateUserBody";
import { inject } from "inversify";
import { USECASETYPES } from "../../shared/types/UseCaseTypes";
import { CreateUserUseCase } from "../../application/useCases/users/CreateUserUseCase";
import { ListUserUseCase } from "../../application/useCases/users/ListUserUseCase";
import { RetrieveUserUseCase } from "../../application/useCases/users/RetrieveUserUseCase";

@controller('/users')
export class UserController {
  constructor(
    @inject(USECASETYPES.CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
    @inject(USECASETYPES.ListUserUseCase) private listUserUseCase: ListUserUseCase,
    @inject(USECASETYPES.RetrieveUserUseCase) private retrieveUserUseCase: RetrieveUserUseCase
  ) {}

  @httpPost('/')
  async create(req: Request, res: Response) {
    try {

      const body: CreateUserBody = req.body;
      await this.createUserUseCase.execute(body);
      return res.status(201).json({message: 'Created'});

    } catch (error) {
      return res.status(500).json({ message: 'Error creating user' });
    }
  }

  @httpGet('/')
  async list(req: Request, res: Response) {
    try {
      const users = await this.listUserUseCase.execute();
      return res.status(201).json(users);

    } catch (error) {
      return res.status(500).json({ message: 'Error creating user' });
    }
  }

  @httpGet('/:id')
  async retrieve(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.retrieveUserUseCase.execute(id);
      return res.status(201).json(user);

    } catch (error) {
      return res.status(500).json({ message: 'Error creating user' });
    }
  }
  
}