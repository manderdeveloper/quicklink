export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly isHandled: boolean;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isHandled = true;
  }
}