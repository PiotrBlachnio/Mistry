import { GoogleApiService } from '../../services/google-api/google-api.service';
import { IBookData } from '../../services/google-api/interfaces/IBookData';
import { Request } from 'express';
import { IGetManyBooksParameters } from '../../services/google-api/interfaces/IGetManyBooksParameters';
import { BookNotFoundException } from '../../common/exceptions/book-not-found.exception';

export class BookService {
    constructor(private readonly _googleApiService = new GoogleApiService()) {}

    public async getMany(req: Request): Promise<IBookData[]> {
        const parameters = this._getParametersFromQuery(req);
        
        const books = await this._googleApiService.getManyBooks(parameters);

        return books;
    }

    public async getById(req: Request): Promise<IBookData> {
        const book = await this._googleApiService.getBookById(req.params.id);
        
        if(!book) throw new BookNotFoundException();

        return book;
    }

    private _getParametersFromQuery(req: Request): IGetManyBooksParameters {
        const query: unknown = req.query;
        const parsedQuery = query as IGetManyBooksParameters;

        return {
            query: parsedQuery.query,
            maxResults: parsedQuery.maxResults,
            startIndex: parsedQuery.startIndex
        }
    }
}