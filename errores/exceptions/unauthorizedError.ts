import { AppError } from './appError';

export class UnauthorizedError extends AppError {
  statusCode = 401;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return { error: 'Unauthorized', message: this.message, statusCode: this.statusCode };
  }
}
