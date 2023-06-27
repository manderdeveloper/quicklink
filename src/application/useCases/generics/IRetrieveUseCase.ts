export interface IRetrieveUseCase<T> {
  retrieve(id: string): Promise<T>;
}