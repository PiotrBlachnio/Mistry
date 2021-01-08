import axios from 'axios';
import { IBookData } from './interfaces/IBookData';
import { IGoogleApiService } from './interfaces/IGoogleApiService';
import { IGetManyBooksParameters } from './interfaces/IGetManyBooksParameters';
import { BookNotFoundException } from '../../common/exceptions/book-not-found.exception';
import { UrlBuilder } from '../../common/utils/url-builder';

export class GoogleApiService implements IGoogleApiService {
    public async getManyBooks(parameters: IGetManyBooksParameters): Promise<IBookData[]> {
        return this._requestBooksData(parameters);
    }

    public async getBookById(id: string): Promise<IBookData> {
        try {
            const response = await axios.get(UrlBuilder.getBookByIdUrl(id));
            return response.data;
        } catch(error) {
            if(error.response.status === 404 || error.response.status === 503) throw new BookNotFoundException();
            else throw error;
        }
    }

    private async _requestBooksData(parameters: IGetManyBooksParameters): Promise<IBookData[]> {
        const response = await axios.get(UrlBuilder.getManyBooksUrl(parameters), { headers: this._getCompressionHeaders() });
        const books = response.data.items || [];

        return books;
    }

    private _getCompressionHeaders(): Record<string, string> {
        return {
            'Accept-Encoding': 'gzip',
            'User-Agent': 'node-api (gzip)'
        }
    }
}