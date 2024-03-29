export interface IController<I, O> {
  handler(controllerInput: I): Promise<O>;
}
