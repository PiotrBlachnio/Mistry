import { IGetManyBooksParameters } from '../google-api/interfaces/IGetManyBooksParameters';
import { AxiosHttpService } from '../http/axios.service';
import { IHttpService } from '../http/interfaces/IHttpService';
import { IMovieData } from './interfaces/IMovieData';

export class OmdbApiService {
    constructor(private readonly _httpService: IHttpService = new AxiosHttpService()) {}

    public async getManyMovies(parameters: IGetManyBooksParameters): Promise<IMovieData[]> {
        
    }
}