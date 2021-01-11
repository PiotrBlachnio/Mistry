import { UrlBuilder } from '../../common/utils/url-builder';
import { IGetManyBooksParameters } from '../google-api/interfaces/IGetManyBooksParameters';
import { AxiosHttpService } from '../http/axios.service';
import { IHttpResponse } from '../http/interfaces/IHttpResponse';
import { IHttpService } from '../http/interfaces/IHttpService';
import { IMovieData } from './interfaces/IMovieData';

export class OmdbApiService {
    constructor(private readonly _httpService: IHttpService = new AxiosHttpService()) {}

    public async getManyMovies(parameters: IGetManyBooksParameters): Promise<IMovieData[]> {
        const response = await this._httpService.makeGetRequest(UrlBuilder.getManyMoviesUrl(parameters));
        const movies = response.data.Search || [];

        return movies;
    }

    public async getMovieById(id: string): Promise<IMovieData | null> {
        const response = await this._httpService.makeGetRequest(UrlBuilder.getMovieByIdUrl(id));
        
        if(response.data.Error) return null;

        return this._mapResponseToMovieData(response);
    }

    public _mapResponseToMovieData(response: IHttpResponse): IMovieData {
        return {
            Title: response.data.Title,
            Year: response.data.Year,
            imdbID: response.data.imdbID,
            Type: response.data.Type,
            Poster: response.data.Poster
        };
    }
}