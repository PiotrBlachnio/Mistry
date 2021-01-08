import { GoogleApiService } from '../../services/google-api/google-api.service';
import { IGoogleApiService } from '../../services/google-api/interfaces/IGoogleApiService';
import { IBookData } from '../../services/google-api/interfaces/IBookData';
import { Request } from 'express';
import { IGetManyBooksParameters } from '../../services/google-api/interfaces/IGetManyBooksParameters';

export class BooksService {
    constructor(private readonly _googleApiService: IGoogleApiService = new GoogleApiService()) {}

    public async getMany(req: Request): Promise<IBookData[]> {
        const parameters = this._getParametersFromQuery(req);
        return this._googleApiService.getManyBooks(parameters);
    }

    public async getById(req: Request): Promise<IBookData> {
        return this._googleApiService.getBookById(req.params.id);
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