import config from '../../config';
import { IGetManyBooksParameters } from '../../services/google-api/interfaces/IGetManyBooksParameters';
import { Constants } from '../constants';

export class UrlBuilder {
    private static readonly BASE_BOOK_URL = 'https://www.googleapis.com/books/v1/volumes';

    public static getManyBooksUrl({ query, maxResults = Constants.BOOK.DEFAULT_MAX_RESULTS, startIndex = Constants.BOOK.DEFAULT_START_INDEX }: IGetManyBooksParameters): string {
        return `${this.BASE_BOOK_URL}?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}&key=${config.BOOKS.API_KEY}`;
    }

    public static getBookByIdUrl(id: string): string {
        return `${this.BASE_BOOK_URL}/${id}?key=${config.BOOKS.API_KEY}`
    }
}