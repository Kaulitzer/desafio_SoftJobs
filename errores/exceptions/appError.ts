export abstract class AppError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);
  }

  abstract serializeErrors(): { error: string, message: string, statusCode: number };
}
