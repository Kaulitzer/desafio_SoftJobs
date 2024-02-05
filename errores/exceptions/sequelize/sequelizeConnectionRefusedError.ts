import { AppError } from "../appError";

export class CustomConnectionRefusedError extends AppError {
  statusCode = 500;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomConnectionRefusedError.prototype);
  }

  serializeErrors() {
    return { error: 'Sequelize Error', message: 'Error de conexion', statusCode: this.statusCode };
  }
}
