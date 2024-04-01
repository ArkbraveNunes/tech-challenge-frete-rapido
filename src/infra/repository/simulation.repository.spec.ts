import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import {
  mockedSimulationEntity,
  mockErrorPattern500,
  mockGetMetricsRepositoryOutput,
} from '@test/mock';
import { simulationSchema, simulationModel } from '@infra/schema';
import { SimulationRepository } from '@infra/repository';
import { ErrorPatternOutput } from '@common/error-pattern';

jest.mock('@common/logger', () => ({
  ...jest.requireActual('@common/logger'),
  LoggerService: jest.fn(
    () =>
      new (class MockRequestFactoryService {
        error() {}
      })(),
  ),
}));

describe('SimulationRepository', () => {
  let mongoSimulationRepository: SimulationRepository;
  let inMemoryMongoServer: MongoMemoryServer;
  let mockedSimulationModel: typeof simulationModel;

  let mongoConnection: mongoose.Connection;
  let expectedMongoError: ErrorPatternOutput;

  beforeAll(async () => {
    inMemoryMongoServer = await MongoMemoryServer.create();
    mongoConnection = (await mongoose.connect(inMemoryMongoServer.getUri()))
      .connection;
    mockedSimulationModel = mongoConnection.model(
      simulationModel.name,
      simulationSchema,
    );

    expectedMongoError = mockErrorPattern500;
  });

  beforeEach(async () => {
    mongoSimulationRepository = new SimulationRepository();
    mongoSimulationRepository._model = mockedSimulationModel;
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await inMemoryMongoServer.stop();
  });

  afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('getMetrics()', () => {
    it('should call getMetrics - success - return metrics', async () => {
      await mongoSimulationRepository.createMany([
        mockedSimulationEntity(),
        mockedSimulationEntity(),
      ]);

      const [metric] = await mongoSimulationRepository.getMetrics();

      Object.keys(mockGetMetricsRepositoryOutput[0]).forEach((key) => {
        expect(metric).toHaveProperty(key);
        expect(typeof metric[key]).toBe(
          typeof mockGetMetricsRepositoryOutput[0][key],
        );
      });
    });

    it('should call getMetrics - error - database error', async () => {
      jest
        .spyOn(mockedSimulationModel, 'aggregate')
        .mockRejectedValue(expectedMongoError);

      await mongoSimulationRepository
        .getMetrics()
        .catch((actualError) => {
          Object.keys(expectedMongoError).forEach((key) => {
            expect(actualError).toHaveProperty(key);
            expect(typeof actualError[key]).toBe(
              typeof expectedMongoError[key],
            );
          });
        })
        .then((result) => expect(result).toBe(undefined));
    });
  });
  describe('createMany()', () => {
    it('should call createMany - success - create user', async () => {
      const [mockSimulation1, mockSimulation2] = [
        mockedSimulationEntity(),
        mockedSimulationEntity(),
      ];
      await mongoSimulationRepository
        .createMany([mockSimulation1, mockSimulation2])
        .then((res) => expect(res).toBe(void 0));
    });

    it('should call createMany - error - database error', async () => {
      jest
        .spyOn(mongoSimulationRepository._model, 'insertMany')
        .mockRejectedValue(expectedMongoError);

      await mongoSimulationRepository
        .createMany([mockedSimulationEntity(), mockedSimulationEntity()])
        .catch((actualError) => {
          Object.keys(expectedMongoError).forEach((key) => {
            expect(actualError).toHaveProperty(key);
            expect(typeof actualError[key]).toBe(
              typeof expectedMongoError[key],
            );
          });
        })
        .then((result) => expect(result).toBe(undefined));
    });
  });
});
