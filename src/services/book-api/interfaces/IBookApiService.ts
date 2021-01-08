import { IBookData } from './IBookData';

export interface IBookApiService {
    getBooksData(query: string): Promise<IBookData[]>;
}