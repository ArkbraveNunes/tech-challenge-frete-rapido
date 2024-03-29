import { MetricsController } from '@application/controller';
import { Request, Response, Router } from 'express';

export class MetricsRoutes {
  private _routeInstance: Router;

  constructor(route: Router) {
    this._routeInstance = route;
  }

  setRoutes(): void {
    this._routeInstance
      .route('/v1/metrics')
      .get((req: Request, res: Response) =>
        new MetricsController().exec(req, res),
      );
  }
}
