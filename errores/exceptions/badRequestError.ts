import { AppError } from "./appError";

export class BadRequestError extends AppError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return { error: 'Bad Request', message: this.message, statusCode: this.statusCode };
  }
}
