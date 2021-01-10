import { IBookData } from './interfaces/IBookData';
import { IGoogleApiService } from './interfaces/IGoogleApiService';
import { IGetManyBooksParameters } from './interfaces/IGetManyBooksParameters';
import { UrlBuilder } from '../../common/utils/url-builder';
import { IHttpService } from '../http/interfaces/IHttpService';
import { AxiosHttpService } from '../http/axios.service';

export class GoogleApiService implements IGoogleApiService {
    constructor(private readonly _httpService: IHttpService = new AxiosHttpService()) {}

    public async getManyBooks(parameters: IGetManyBooksParameters): Promise<IBookData[]> {
        const response = await this._httpService.makeGetRequest(UrlBuilder.getManyBooksUrl(parameters), this._getCompressionHeaders());
        const books = response.data.items || [];

        return books;
    }

    public async getBookById(id: string): Promise<IBookData | null> {
        try {
            const response = await this._httpService.makeGetRequest(UrlBuilder.getBookByIdUrl(id), this._getCompressionHeaders());
            return response.data as IBookData;
        } catch(error) {
            if(error.response.status === 404 || error.response.status === 503) return null;
            throw error;
        }
    }

    private _getCompressionHeaders() {
        return {
            'Accept-Encoding': 'gzip',
            'User-Agent': 'node-api (gzip)'
        }
    }
}