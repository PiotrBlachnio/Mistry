import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function validateQuery(schema: ObjectSchema) {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            await schema.validateAsync(req.query);
        } catch(error) {
            next(error);
        }
    }
}