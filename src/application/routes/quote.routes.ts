import { QuoteController } from '@application/controller';
import { Request, Response, Router } from 'express';

export class QuoteRoutes {
  private _routeInstance: Router;

  constructor(route: Router) {
    this._routeInstance = route;
  }

  setRoutes(): void {
    this._routeInstance.route('/v1/quote').post((req: Request, res: Response) =>
      /*
        #swagger.tags = ['Quote']
        #swagger.description = 'Create a shipping quote using the external API Frete Rapido'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'All data is mandatory for endpoint consumption',
            schema: { $ref: '#/definitions/QuoteBodyInputDto' }
        }
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/QuoteOutputDto' }
        }
        #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ErrorPattern400' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/ErrorPattern500' }
        }
      */
      new QuoteController().exec(req, res),
    );
  }
}
