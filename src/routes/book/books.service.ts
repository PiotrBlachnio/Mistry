import { GoogleApiService } from '../../services/google-api/google-api.service';
import { IGoogleApiService } from '../../services/google-api/interfaces/IGoogleApiService';
import { IBookData } from '../../services/google-api/interfaces/IBookData';
import { Request } from 'express';
import { ISearchBooksParameters } from '../../services/google-api/interfaces/ISearchBooksParameters';

export class BooksService {
    constructor(private readonly _googleApiService: IGoogleApiService = new GoogleApiService()) {}

    public async getMany(req: Request): Promise<IBookData[]> {
        const parameters = this._getParametersFromQuery(req);
        return this._googleApiService.getManyBooks(parameters);
    }

    private _getParametersFromQuery(req: Request): ISearchBooksParameters {
        const query: unknown = req.query;
        const parsedQuery = query as ISearchBooksParameters;

        return {
            query: parsedQuery.query,
            maxResults: parsedQuery.maxResults,
            startIndex: parsedQuery.startIndex
        }
    }
}