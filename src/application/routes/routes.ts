import { Router, Request, Response } from 'express';
import { QuoteRoutes } from './quote.routes';

import { env } from '@common/env';

class Routes {
  private _routes: Router;

  constructor() {
    this._routes = Router();
  }

  init(): Router {
    this.setRoutes();
    return this._routes;
  }

  private setRoutes(): void {
    this._routes.all(['/'], (req: Request, res: Response) => {
      res.json({
        app: env.appName,
        version: env.appVersion,
        date: new Date(),
      });
    });

    new QuoteRoutes(this._routes).setRoutes();
  }
}

export const routes = new Routes();
