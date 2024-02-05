import { Request, Response, NextFunction } from 'express';
import { AppError } from '../exceptions/appError';
import { ConnectionRefusedError } from 'sequelize';
import { CustomConnectionRefusedError } from '../exceptions/sequelize/sequelizeConnectionRefusedError';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(err.serializeErrors());
  } else if (err instanceof ConnectionRefusedError) {
    const error = new CustomConnectionRefusedError('Error connecting to database');
    res.status(error.statusCode).json(error.serializeErrors());
  } else {
    res.status(500).json({ error: 'Internal Server Error', statusCode: 500 });
  }
}
