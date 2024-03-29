export interface ICreateRepository<T> {
  create(entity: T): Promise<void>;
}

export interface ICreateManyRepository<T> {
  createMany(entity: T[]): Promise<void>;
}
