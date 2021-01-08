import config from '../../config';
import axios from 'axios';
import { IBookData } from './interfaces/IBookData';
import { IBookApiService } from './interfaces/IBookApiService';
import { ISearchParameters } from './interfaces/ISearchParameters';

export class BookApiService implements IBookApiService {
    public async getBooksData(parameters: ISearchParameters): Promise<IBookData[]> {
        return this._requestBooksData(parameters);
    }

    private async _requestBooksData(parameters: ISearchParameters): Promise<IBookData[]> {
        const response = await axios.get(this._buildUrl(parameters), { headers: this._getCompressionHeaders() });
        return response.data.items;
    }

    private _buildUrl({ query, maxResults = '5', startIndex = '1'}: ISearchParameters): string {
        return `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}&key=${config.BOOKS.API_KEY}`
    }

    private _getCompressionHeaders(): Record<string, string> {
        return {
            'Accept-Encoding': 'gzip',
            'User-Agent': 'node-api (gzip)'
        }
    }
}