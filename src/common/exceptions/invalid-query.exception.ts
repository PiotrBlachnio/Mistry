import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class InvalidQueryException extends BaseException {
    id = Constants.EXCEPTION.INVALID_QUERY;
    statusCode = Constants.STATUS_CODE.BAD_REQUEST;
    message = '';

    public constructor(parameter: string) {
        super();
        this.message = `Query parameter \'${parameter}\' is invalid`;
    }

    public static of(parameter: string): InvalidQueryException {
        return new InvalidQueryException(parameter);
    }
}