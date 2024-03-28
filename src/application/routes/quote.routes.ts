import { QuoteController } from '@application/controller';
import { Request, Response, Router } from 'express';

export class QuoteRoutes {
  private _routeInstance: Router;

  constructor(route: Router) {
    this._routeInstance = route;
  }

  setRoutes(): void {
    this._routeInstance
      .route('/v1/quote')
      .post((req: Request, res: Response) =>
        new QuoteController().exec(req, res),
      );
  }
}
