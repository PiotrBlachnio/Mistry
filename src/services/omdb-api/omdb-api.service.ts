import { UrlBuilder } from '../../common/utils/url-builder';
import { IGetManyBooksParameters } from '../google-api/interfaces/IGetManyBooksParameters';
import { AxiosHttpService } from '../http/axios.service';
import { IHttpService } from '../http/interfaces/IHttpService';
import { IMovieData } from './interfaces/IMovieData';

export class OmdbApiService {
    constructor(private readonly _httpService: IHttpService = new AxiosHttpService()) {}

    public async getManyMovies(parameters: IGetManyBooksParameters): Promise<IMovieData[]> {
        const response = await this._httpService.makeGetRequest(UrlBuilder.getManyMoviesUrl(parameters));
        const movies = response.data.Search || [];

        return movies.map((movie: Record<string, any>) => this._mapResponseToMovieData(movie));
    }

    public async getMovieById(id: string): Promise<IMovieData | null> {
        const response = await this._httpService.makeGetRequest(UrlBuilder.getMovieByIdUrl(id));
        if(response.data.Error) return null;

        return this._mapResponseToMovieData(response.data);
    }

    private _mapResponseToMovieData(data: Record<string, any>): IMovieData {
        return {
            id: data.imdbID,
            title: data.Title,
            year: data.Year,
            type: data.Type,
            poster: data.Poster
        };
    }
}