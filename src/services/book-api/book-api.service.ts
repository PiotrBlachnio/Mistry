import config from '../../config';
import axios from 'axios';
import { IBookData } from './interfaces/IBookData';
import { IBookApiService } from './interfaces/IBookApiService';

export class BookApiService implements IBookApiService {
    public async getBooksData(query: string, maxResults: string = '3'): Promise<IBookData[]> {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${config.BOOKS.API_KEY}`, {
            headers: {
                'Accept-Encoding': 'gzip',
                'User-Agent': 'node-api (gzip)'
            }
        });

        return response.data.items;
    }
}