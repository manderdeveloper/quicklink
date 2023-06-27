import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { USECASETYPES } from "../../shared/types/UseCaseTypes";
import { ResolveUrlUseCase } from "../../application/useCases/url/ResolveUrlUseCase";

@controller('/')
export class ResolveUrlController {
  constructor(
    @inject(USECASETYPES.ResolveUrlUseCase) private resolveUrlUseCase: ResolveUrlUseCase
  ) {}

  @httpGet(':uuid')
  async resolve(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const url = await this.resolveUrlUseCase.execute(uuid);
      if (!url) return res.status(404).json({message: 'Not found'});
      return res.redirect(url)

    } catch (error) {
      return res.status(500).json({ message: 'Error creating user' });
    }
  }
}