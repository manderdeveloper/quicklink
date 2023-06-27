export interface IListUseCase<T> {
  list(): Promise<T[]>;
}