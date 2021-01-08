import config from '../../config';
import axios from 'axios';

export class BookApiService {
    public async get(query: string): Promise<Record<string, unknown>> {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=2&key=${config.BOOKS.API_KEY}`);
        return response.data;
    }
}