import { Request } from 'express';
import { OmdbApiService } from '../../services/omdb-api/omdb-api.service';
import { IGetManyMoviesParameters } from '../../services/omdb-api/interfaces/IGetManyMoviesParameters';
import { IMovieData } from '../../services/omdb-api/interfaces/IMovieData';
import { MovieNotFoundException } from '../../common/exceptions/movie-not-found.exception';

export class MoviesService {
    constructor(private readonly _omdbApiService = new OmdbApiService()) {}

    public async getMany(req: Request): Promise<IMovieData[]> {
        const parameters = this._getParametersFromQuery(req);
        
        const movies = await this._omdbApiService.getManyMovies(parameters);

        return movies;
    }

    public async getById(req: Request): Promise<IMovieData> {
        const movie = await this._omdbApiService.getMovieById(req.params.id);
        
        if(!movie) throw new MovieNotFoundException();

        return movie;
    }

    private _getParametersFromQuery(req: Request): IGetManyMoviesParameters {
        const query: unknown = req.query;
        const parsedQuery = query as IGetManyMoviesParameters;

        return {
            query: parsedQuery.query,
            page: parsedQuery.page
        }
    }
}