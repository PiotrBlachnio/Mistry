import config from '../../config';
import axios from 'axios';
import { IBookData } from './interfaces/IBookData';
import { IBookApiService } from './interfaces/IBookApiService';

export class BookApiService implements IBookApiService {
    public async getBooksData(query: string, maxResults: string = '3'): Promise<IBookData[]> {
        return this._requestBooksData(query, maxResults);
    }

    private async _requestBooksData(query: string, maxResults: string): Promise<IBookData[]> {
        const response = await axios.get(this._buildUrl(query, maxResults), { headers: this._getCompressionHeaders() });
        return response.data.items;
    }

    private _buildUrl(query: string, maxResults: string): string {
        return `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${config.BOOKS.API_KEY}`
    }

    private _getCompressionHeaders(): Record<string, string> {
        return {
            'Accept-Encoding': 'gzip',
            'User-Agent': 'node-api (gzip)'
        }
    }
}