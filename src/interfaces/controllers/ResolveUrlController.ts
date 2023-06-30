import { NextFunction, Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { USECASETYPES } from "../../shared/types/UseCaseTypes";
import { ResolveUrlUseCase } from "../../application/useCases/url/ResolveUrlUseCase";
import { NotFoundError } from "../../shared/errors/NotFoundError";

@controller('/')
export class ResolveUrlController {
  constructor(
    @inject(USECASETYPES.ResolveUrlUseCase) private resolveUrlUseCase: ResolveUrlUseCase
  ) {}

  @httpGet(':uuid')
  async resolve(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;
      const url = await this.resolveUrlUseCase.execute(uuid);
      if (!url) return new NotFoundError('Not found');
      return res.redirect(url)

    } catch (error) {
      next(error);
    }
  }
}