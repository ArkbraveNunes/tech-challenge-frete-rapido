import { MetricsInputDto, MetricsOutputDto } from '@application/dto';
import { ErrorPatternService, IErrorPattern } from '@common/error-pattern';
import { MetricsService } from '@domain/service';
import { Request, Response } from 'express';

export class MetricsController {
  errorPattern: IErrorPattern;
  _service: MetricsService;

  constructor() {
    this.errorPattern = new ErrorPatternService();
    this._service = new MetricsService();
  }

  async exec(req: Request, res: Response): Promise<Response<MetricsOutputDto>> {
    try {
      const query = req.query as MetricsInputDto;

      const result: MetricsOutputDto = await this._service.exec({
        lastQuotes: query.last_quotes ? parseInt(query.last_quotes) : 0,
      });

      return res.status(200).json(result);
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
