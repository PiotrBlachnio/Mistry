import config from '../../config';
import axios from 'axios';
import { IBookData } from './interfaces/IBookData';
import { IBookApiService } from './interfaces/IBookApiService';

export class BookApiService implements IBookApiService {
    public async getBooksData(query: string, maxResults: number = 10): Promise<IBookData[]> {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${config.BOOKS.API_KEY}`);
        return response.data.items;
    }
}