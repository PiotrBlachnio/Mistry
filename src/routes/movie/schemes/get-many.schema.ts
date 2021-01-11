import Joi from 'joi';
import { InvalidQueryException } from '../../../common/exceptions/invalid-query.exception';

export const GetManyMoviesValidationSchema = Joi.object({
    query: Joi.string().required().error(InvalidQueryException.of('query')),
    page: Joi.number().min(1).max(100).optional().error(InvalidQueryException.of('page'))
});