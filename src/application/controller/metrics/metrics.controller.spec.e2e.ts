import supertest from 'supertest';
import { HttpStatusCode } from 'axios';

import { SuperTestServer } from '@test/e2e';

jest.mock('@common/env', () => ({
  ...jest.requireActual('@common/env'),
  env: {
    appBasePath: '/frete-rapido',
    database: {
      host: 'localhost',
      port: process.env.APPLICATION__DB_PORT,
      database: process.env.APPLICATION__DB_NAME,
      username: process.env.APPLICATION__DB_USER,
      password: process.env.APPLICATION__DB_PASS,
      type: process.env.APPLICATION__DB_TYPE || '',
      schemasName: {
        simulationSchema: 'simulation-test-e2e',
      },
    },
  },
}));

describe('MetricsController E2E', () => {
  const superTestServer: SuperTestServer = new SuperTestServer();

  beforeEach(() => {
    superTestServer.init();
  });

  afterEach(() => {
    superTestServer.close();
  });

  it('status 200 - should call quoteService controller', async () => {
    const result = await supertest(superTestServer.getServer()).get(
      '/frete-rapido/v1/metrics',
    );

    console.log(result.body);
    expect(result.statusCode).toBe(HttpStatusCode.Ok);
  });
});
