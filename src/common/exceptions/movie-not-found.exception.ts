import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class MovieNotFoundException extends BaseException {
    id = Constants.EXCEPTION.MOVIE_NOT_FOUND;
    statusCode = Constants.STATUS_CODE.NOT_FOUND;
    message = 'Movie with provided id does not exist';
}