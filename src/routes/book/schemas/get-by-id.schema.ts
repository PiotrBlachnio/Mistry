import Joi from 'joi';
import { InvalidParametersException } from '../../../common/exceptions/invalid-parameters.exception';

export const GetManyValidationSchema = Joi.object({
    id: Joi.string().required()
}).error(new InvalidParametersException);