import { AppError } from './appError';

export class NotFoundError extends AppError {
  statusCode = 404;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return { error: 'Not Found', message: this.message, statusCode: this.statusCode };
  }
}
