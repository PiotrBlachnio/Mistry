import { GoogleApiService } from '../../services/google-api/google-api.service';
import { IGoogleApiService } from '../../services/google-api/interfaces/IGoogleApiService';
import { IBookData } from '../../services/google-api/interfaces/IBookData';
import { Request } from 'express';

export class BooksService {
    constructor(private readonly _googleApiService: IGoogleApiService = new GoogleApiService()) {}

    public async get(req: Request): Promise<IBookData[]> {
        const { query, maxResults, startIndex } = req.query as any;
        return this._googleApiService.getBooksData({ query, maxResults, startIndex });
    }
}