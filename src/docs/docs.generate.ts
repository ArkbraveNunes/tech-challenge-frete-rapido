import swaggerAutogen from 'swagger-autogen';

import { env } from '@common/env';
import {
  mockMetricsControllerOutput,
  mockQuoteControllerInput,
  mockQuoteControllerOutput,
  mockErrorPattern400,
  mockErrorPattern500,
} from '@test/mock';

class DocsGenerate {
  private _outputFile: string;
  private _routesFile: string[];

  constructor() {
    this._outputFile = './swagger.json';
    this._routesFile = ['../application/routes/*.routes.ts'];
  }

  private baseSwagger(): Record<string, any> {
    return {
      info: {
        version: env.appVersion,
        title: env.appName,
        description: env.appDescription,
      },
      servers: [],
      basePath: env.appBasePath,
      definitions: {
        MetricsOutputDto: mockMetricsControllerOutput,
        QuoteBodyInputDto: mockQuoteControllerInput,
        QuoteOutputDto: mockQuoteControllerOutput,
        ErrorPattern400: mockErrorPattern400,
        ErrorPattern500: mockErrorPattern500,
      },
    };
  }

  generateDocs() {
    swaggerAutogen({ openapi: '3.0.0' })(
      this._outputFile,
      this._routesFile,
      this.baseSwagger(),
    );
  }
}

new DocsGenerate().generateDocs();
