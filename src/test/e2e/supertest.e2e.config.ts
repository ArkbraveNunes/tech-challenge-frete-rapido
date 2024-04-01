import { Server } from 'http';
import { App } from '../../app';

export class SuperTestServer {
  private _server: Server;

  init(): void {
    this._server = new App().getApp().listen();
  }
  close(): void {
    this._server.close();
  }

  getServer(): Server {
    return this._server;
  }
}
