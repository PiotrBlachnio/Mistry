import { Request, Response, NextFunction } from 'express';
import { Constants } from '../constants';
import { BaseException } from '../exceptions/base.exception';
import { Logger } from '../utils/logger';

export function catchExceptions(exception: Error, req: Request, res: Response, next: NextFunction): void {
    let id = Constants.DEFAULT_EXCEPTION.ID;
    let status = Constants.DEFAULT_EXCEPTION.STATUS;
    let message = Constants.DEFAULT_EXCEPTION.MESSAGE;

    Logger.log(exception.message, Constants.COLOR.RED);

    if(exception instanceof BaseException) {
        id = exception.id;
        status = exception.statusCode;
        message = exception.message;
    }

    res.status(status).json({ id, message });
    next();
}