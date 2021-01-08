import { IBookData } from './IBookData';
import { ISearchBooksParameters } from './ISearchBooksParameters';

export interface IGoogleApiService {
    getManyBooks(parameters: ISearchBooksParameters): Promise<IBookData[]>;
}