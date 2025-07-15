import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

type RequestType = 'body' | 'query' | 'params';

export const validate = (type: RequestType, schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const submitData = req[type];
      await schema.validateAsync(submitData);
      next();
    } catch (err: any) {
      if (err?.details?.[0]?.message) {
        return res.status(400).send(err.details[0].message);
      }
      return res.status(400).send('Validation error');
    }
  };
};
