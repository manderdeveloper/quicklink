export interface ICreateUseCase<TBody> {
  create(body: TBody): Promise<void>;
}