import { BookApiService } from '../../services/book-api/book-api.service';
import { IBookApiService } from '../../services/book-api/interfaces/IBookApiService';
import { IBookData } from '../../services/book-api/interfaces/IBookData';
import { NextFunction, Request } from 'express';
import Joi from 'joi';
import { InvalidQueryException } from '../../common/exceptions/invalid-query.exception';

export class BooksService {
    constructor(private readonly _bookApiService: IBookApiService = new BookApiService()) {}

    public async get(req: Request, next: NextFunction): Promise<IBookData[]> {
        const schema = Joi.object({
            query: Joi.string().required().error(InvalidQueryException.of('query')),
            maxResults: Joi.number().optional().error(InvalidQueryException.of('maxResults'))
        });

        try {
            await schema.validateAsync(req.query);
        } catch(error) {
            next(error)
        }

        return this._bookApiService.getBooksData(req.query.q as string);
    }
}