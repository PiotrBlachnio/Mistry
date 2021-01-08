import { IBookData } from './IBookData';
import { ISearchParameters } from './ISearchParameters';

export interface IGoogleApiService {
    getBooksData(parameters: ISearchParameters): Promise<IBookData[]>;
}