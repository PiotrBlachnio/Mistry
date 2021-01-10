import faker from 'faker';
import { Constants } from '../../constants';
import { Exception } from '../../constants/exception';
import { StatusCode } from '../../constants/status-code';
import { BookNotFoundException } from '../../exceptions/book-not-found.exception';
import { catchExceptions } from '../catch-exceptions.middleware';

describe('catchExceptions', () => {
    describe('When exception is not instance of BaseException', () => {
        it('Should call response object with default parameters', () => {
            const exception = new Error(faker.random.alphaNumeric(10));
            checkMockCallsWithProvidedParameters(exception, Constants.DEFAULT_EXCEPTION.STATUS, Constants.DEFAULT_EXCEPTION.ID, Constants.DEFAULT_EXCEPTION.MESSAGE);
        });
    });

    describe('When exception is an instance of BaseException', () => {
        it('Should call response object with changed parameters', () => {
            const exception = new BookNotFoundException();
            checkMockCallsWithProvidedParameters(exception, exception.statusCode, exception.id, exception.message);
        });
    });
});

const checkMockCallsWithProvidedParameters = (exception: Error, status: StatusCode, id: Exception, message: string): void => {
    const mockedJsonFunction = jest.fn();
    const mockedNextFunction = jest.fn();
    const mockedResponse = { status: jest.fn().mockReturnValue({ json: mockedJsonFunction }) };

    // @ts-expect-error
    catchExceptions(exception, {}, mockedResponse, mockedNextFunction);

    expect(mockedResponse.status).toHaveBeenCalledWith(status);
    expect(mockedNextFunction).toHaveBeenCalled();
    expect(mockedJsonFunction).toHaveBeenCalledWith({ id, message });
}