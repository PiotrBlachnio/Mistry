import Joi from 'joi';
import { InvalidQueryException } from '../../../common/exceptions/invalid-query.exception';

export const GetBookValidationSchema = Joi.object({
    query: Joi.string().required().error(InvalidQueryException.of('query')),
    maxResults: Joi.number().optional().min(1).max(40).error(InvalidQueryException.of('maxResults'))
});