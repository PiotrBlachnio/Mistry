import config from '../../config';
import { IGetManyBooksParameters } from '../../services/google-api/interfaces/IGetManyBooksParameters';
import { IGetManyMoviesParameters } from '../../services/omdb-api/interfaces/IGetManyMoviesParameters';
import { Constants } from '../constants';

export class UrlBuilder {
    public static getManyBooksUrl({ query, maxResults = Constants.BOOK.DEFAULT_MAX_RESULTS, startIndex = Constants.BOOK.DEFAULT_START_INDEX }: IGetManyBooksParameters): string {
        return `${Constants.BOOK.BASE_URL}?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}&key=${config.BOOK.API_KEY}`;
    }

    public static getBookByIdUrl(id: string): string {
        return `${Constants.BOOK.BASE_URL}/${id}?key=${config.BOOK.API_KEY}`
    }

    public static getManyMoviesUrl({ query, page = Constants.MOVIE.DEFAULT_PAGE }: IGetManyMoviesParameters): string {
        return `${Constants.MOVIE.BASE_URL}/?s=${query}&page=${page}&apikey=${config.MOVIE.API_KEY}`;
    }

    public static getMovieByIdUrl(id: string): string {
        return `${Constants.MOVIE.BASE_URL}/?i=${id}&apikey=${config.MOVIE.API_KEY}`;
    }
}