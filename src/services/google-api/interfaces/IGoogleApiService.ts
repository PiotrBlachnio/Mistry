import { IBookData } from './IBookData';
import { IGetManyBooksParameters } from './IGetManyBooksParameters';

export interface IGoogleApiService {
    getManyBooks(parameters: IGetManyBooksParameters): Promise<IBookData[]>;

    getBookById(id: string): Promise<IBookData | null>;
}