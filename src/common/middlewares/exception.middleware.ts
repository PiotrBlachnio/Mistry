import { Request, Response, NextFunction } from 'express';
import { Constants } from '../constants';
import { BaseException } from '../exceptions/base.exception';
import { Logger } from '../utils/logger';

export class ExceptionMiddleware {
    private _id: number = Constants.DEFAULT_EXCEPTION.ID;
    private _status: number = Constants.DEFAULT_EXCEPTION.STATUS;
    private _message: string = Constants.DEFAULT_EXCEPTION.MESSAGE;

    constructor() {
        this.init = this.init.bind(this);
        this._assignBaseExceptionData = this._assignBaseExceptionData.bind(this);
        this._createResponse = this._createResponse.bind(this);
    }

    public init(exception: Error, req: Request, res: Response, next: NextFunction): Response {
        Logger.log(exception.message, Constants.COLOR.RED);

        if(exception instanceof BaseException) this._assignBaseExceptionData(exception);

        return this._createResponse(res);
    }

    private _assignBaseExceptionData(exception: BaseException): void {
        this._id = exception.id;
        this._status = exception.statusCode;
        this._message = exception.message;
    }

    private _createResponse(res: Response): Response {
        return res.status(this._status).json({
            id: this._id,
            message: this._message
        });
    }
}