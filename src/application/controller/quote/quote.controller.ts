import { Request, Response } from 'express';

import { QuoteInputDto, QuoteOutputDto } from '@application/dto';
import { QuoteService } from '@domain/service';
import { ErrorPatternService, IErrorPattern } from '@common/error-pattern';

export class QuoteController {
  errorPattern: IErrorPattern;
  _service: QuoteService;

  constructor() {
    this.errorPattern = new ErrorPatternService();
    this._service = new QuoteService();
  }

  async exec(req: Request, res: Response): Promise<Response<QuoteOutputDto>> {
    try {
      const body: QuoteInputDto = req.body;

      const result: QuoteOutputDto = await this._service.exec(body);

      return res.status(200).json({
        ...result,
      });
    } catch (err: any) {
      const error = err.statusCode
        ? this.errorPattern.customError(err)
        : this.errorPattern.internalServerError();

      return res.status(error.statusCode).json({
        ...error,
      });
    }
  }
}
