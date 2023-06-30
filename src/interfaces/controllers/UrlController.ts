import { NextFunction, Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { USECASETYPES } from "../../shared/types/UseCaseTypes";
import { CreateUrlUseCase } from "../../application/useCases/url/CreateUrlUseCase";
import { CreateUrlBody } from "../../application/useCases/url/body/CreateUrlBody";
import { validationAuthMiddleware } from "../middlewares/AuthMiddleware";
import { UserRequest } from "../../shared/models/Request";

@controller('/api/urls')
export class UrlController {
  constructor(
    @inject(USECASETYPES.CreateUrlUseCase) private createUrlUseCase: CreateUrlUseCase
  ) {}

  @httpPost('/', validationAuthMiddleware())
  async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const body: CreateUrlBody = { ...req.body, userEmail: user.email.value};
      await this.createUrlUseCase.execute(body);
      return res.status(201).json({message: 'Created'});

    } catch (error) {
      next(error);
    }
  }
}