import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class BookNotFoundException extends BaseException {
    id = Constants.EXCEPTION.BOOK_NOT_FOUND;
    statusCode = Constants.STATUS_CODE.NOT_FOUND;
    message = 'Book with provided id does not exist';
}