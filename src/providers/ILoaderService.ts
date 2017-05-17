export interface ILoaderService {
  on(message: string): void;
  off(force: boolean): void;
}
