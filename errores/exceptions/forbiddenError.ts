import { AppError } from './appError';

export class ForbiddenError extends AppError {
  statusCode = 403;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return { error: 'Forbidden', message: this.message, statusCode: this.statusCode };
  }
}
