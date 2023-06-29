import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { USECASETYPES } from "../../shared/types/UseCaseTypes";
import { CreateUrlUseCase } from "../../application/useCases/url/CreateUrlUseCase";
import { CreateUrlBody } from "../../application/useCases/url/body/CreateUrlBody";

@controller('/api/urls')
export class UrlController {
  constructor(
    @inject(USECASETYPES.CreateUrlUseCase) private createUrlUseCase: CreateUrlUseCase
  ) {}

  @httpPost('/')
  async create(req: Request, res: Response) {
    try {

      const body: CreateUrlBody = req.body;
      await this.createUrlUseCase.execute(body);
      return res.status(201).json({message: 'Created'});

    } catch (error) {
      return res.status(500).json({ message: 'Error creating user' });
    }
  }
}