import { NextFunction, Request, Response } from 'express';

const wrap = (fn: any, instance: any, callback?: () => void | Promise<void>) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await fn.call(instance, req, res);
      return res.status(200).json({...data, statusCode: 200});
    } catch (err) {
      if(callback) {
        if(Object.getPrototypeOf(callback)[Symbol.toStringTag] === 'AsyncFunction') {
          await callback();
        } else {
          callback();
        }
      }
      next(err)
    }
  }
}

export const wrapTryCatch = (callback?: () => void | Promise<void>) => {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      const instance = this;
      const method = wrap(originalMethod, instance, callback);
      return method(req, res, next);
    }
    return descriptor;
  }
}
