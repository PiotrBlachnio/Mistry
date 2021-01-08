import Joi from 'joi';
import { InvalidQueryException } from '../../../common/exceptions/invalid-query.exception';

export const GetBooksValidationSchema = Joi.object({
    query: Joi.string().required().error(InvalidQueryException.of('query')),
    maxResults: Joi.number().min(1).max(40).optional().error(InvalidQueryException.of('maxResults')),
    startIndex: Joi.number().min(0).max(100).optional().error(InvalidQueryException.of('startIndex'))
});