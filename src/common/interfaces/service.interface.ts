export interface IService<I, O> {
  exec(serviceInput: I): Promise<O>;
}
