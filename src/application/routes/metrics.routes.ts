import { MetricsController } from '@application/controller';
import { validateMetricsInput } from '@application/dto';
import { ValidateData } from '@common/middlewares';
import { Request, Response, Router } from 'express';

export class MetricsRoutes {
  private _routeInstance: Router;

  constructor(route: Router) {
    this._routeInstance = route;
  }

  setRoutes(): void {
    this._routeInstance
      .route('/v1/metrics')
      .get(ValidateData(validateMetricsInput), (req: Request, res: Response) =>
        /*
        #swagger.tags = ['Metrics']
        #swagger.description = 'Get the metrics of all quotes stored in the database.'
        #swagger.parameters['last_quotes'] = {
            in: 'query',
            description: 'Defines how many most recent quotes will be taken into account to generate the metric.',
            type: 'number',
            example: 10
        }
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/MetricsOutputDto' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/ErrorPattern500' }
        }
      */
        new MetricsController().exec(req, res),
      );
  }
}
