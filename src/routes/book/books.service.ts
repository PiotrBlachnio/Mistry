import axios from 'axios';
import { BookApiService } from '../../services/book-api/book-api.service';

export class BooksService {
    constructor(private readonly _bookApiService: BookApiService = new BookApiService()) {}

    public async get(query: string): Promise<Record<string, unknown>> {
        return this._bookApiService.get(query);
    }
}