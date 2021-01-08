import config from '../../config';
import axios from 'axios';
import { IBookData } from './interfaces/IBookData';
import { IGoogleApiService } from './interfaces/IGoogleApiService';
import { ISearchBooksParameters } from './interfaces/ISearchBooksParameters';
import { BookNotFoundException } from '../../common/exceptions/book-not-found.exception';

export class GoogleApiService implements IGoogleApiService {
    public async getManyBooks(parameters: ISearchBooksParameters): Promise<IBookData[]> {
        return this._requestBooksData(parameters);
    }

    public async getBookById(id: string): Promise<IBookData> {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${config.BOOKS.API_KEY}`);
            return response.data;
        } catch(error) {
            if(error.response.status === 404 || error.response.status === 503) throw new BookNotFoundException();
            else throw error;
        }
    }

    private async _requestBooksData(parameters: ISearchBooksParameters): Promise<IBookData[]> {
        const response = await axios.get(this._buildUrl(parameters), { headers: this._getCompressionHeaders() });
        return response.data.items;
    }

    private _buildUrl({ query, maxResults = 5, startIndex = 1}: ISearchBooksParameters): string {
        return `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}&key=${config.BOOKS.API_KEY}`
    }

    private _getCompressionHeaders(): Record<string, string> {
        return {
            'Accept-Encoding': 'gzip',
            'User-Agent': 'node-api (gzip)'
        }
    }
}