import { IBookData } from './IBookData';

export interface IBookApiService {
    getBooksData(query: string, maxResults: string): Promise<IBookData[]>;
}