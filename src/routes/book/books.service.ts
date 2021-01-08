import { BookApiService } from '../../services/book-api/book-api.service';
import { IBookApiService } from '../../services/book-api/interfaces/IBookApiService';
import { IBookData } from '../../services/book-api/interfaces/IBookData';
import { NextFunction, Request } from 'express';

export class BooksService {
    constructor(private readonly _bookApiService: IBookApiService = new BookApiService()) {}

    public async get(req: Request): Promise<IBookData[]> {
        const { query, maxResults, startIndex } = req.query as any;
        return this._bookApiService.getBooksData({ query, maxResults, startIndex });
    }
}