export interface IUpdateUseCase<TBody> {
  update(id: string, body: TBody): Promise<void>;
}