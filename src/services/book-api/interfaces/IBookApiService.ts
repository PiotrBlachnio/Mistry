import { IBookData } from './IBookData';
import { ISearchParameters } from './ISearchParameters';

export interface IBookApiService {
    getBooksData(parameters: ISearchParameters): Promise<IBookData[]>;
}