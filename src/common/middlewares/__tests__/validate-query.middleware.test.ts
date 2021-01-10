import Joi from 'joi';
import faker from 'faker';
import { validateQuery } from '../validate-query.middleware';

describe('validateQuery', () => {
    const schema = Joi.object({
        id: Joi.number().required().error(new Error('Invalid id'))
    });

    describe('When query is valid', () => {
        it('Should call next function without any argument', async () => {
            const query = { id: faker.random.number() }
            const next = jest.fn();

            //@ts-expect-error
            await validateQuery(schema)({ query }, {}, next);
            expect(next).toHaveBeenCalledWith();
        });
    });

    describe('When query is invalid', () => {
        it('Should call next function with correct error object', async () => {
            const query = { id: faker.random.uuid() };
            const next = jest.fn();

            //@ts-expect-error
            await validateQuery(schema)({ query }, {}, next);
            expect(next).toHaveBeenCalledWith(new Error('Invalid id'));
        });
    });
});