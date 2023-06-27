export interface IDeleteUseCase<T> {
  delete(id: string): Promise<void>;
}