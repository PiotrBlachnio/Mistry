import axios from 'axios';
import { IBookData } from './interfaces/IBookData';
import { IGoogleApiService } from './interfaces/IGoogleApiService';
import { IGetManyBooksParameters } from './interfaces/IGetManyBooksParameters';
import { UrlBuilder } from '../../common/utils/url-builder';

export class GoogleApiService implements IGoogleApiService {
    public async getManyBooks(parameters: IGetManyBooksParameters): Promise<IBookData[]> {
        const response = await axios.get(UrlBuilder.getManyBooksUrl(parameters), { headers: this._getCompressionHeaders() });
        const books = response.data.items || [];

        return books;
    }

    public async getBookById(id: string): Promise<IBookData | null> {
        try {
            const response = await axios.get(UrlBuilder.getBookByIdUrl(id), { headers: this._getCompressionHeaders() });
            return response.data;
        } catch(error) {
            if(error.response.status === 404 || error.response.status === 503) return null;
            else throw error;
        }
    }

    private _getCompressionHeaders(): Record<string, string> {
        return {
            'Accept-Encoding': 'gzip',
            'User-Agent': 'node-api (gzip)'
        }
    }
}