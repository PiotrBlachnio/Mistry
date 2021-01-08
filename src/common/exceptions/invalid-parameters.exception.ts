import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class InvalidParametersException extends BaseException {
    id = Constants.EXCEPTION.BOOK_NOT_FOUND;
    statusCode = Constants.STATUS_CODE.BAD_REQUEST;
    message = 'Provided parameters are invalid';
}