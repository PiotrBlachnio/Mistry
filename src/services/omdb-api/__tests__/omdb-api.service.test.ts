import faker from 'faker';
import { IGetManyMoviesParameters } from '../interfaces/IGetManyMoviesParameters';
import { IMovieData } from '../interfaces/IMovieData';
import { OmdbApiService } from '../omdb-api.service';

describe('OmdbApiService', () => {
    let omdbApiService: OmdbApiService;

    describe('getManyMovies', () => {
        describe('When movies exist', () => {
            beforeAll(() => {
                const mockedHttpService = {
                    makeGetRequest: jest.fn().mockReturnValue({ data: { Search: ['Movie'] }})
                }

                omdbApiService = new OmdbApiService(mockedHttpService);
            });

            it('Should return found movies', async () => {
                const movies = await omdbApiService.getManyMovies(createGetManyMoviesParameters());
                expect(movies).toEqual(['Movie']);
            });
        });

        describe('When movies do not exist', () => {
            beforeAll(() => {
                const mockedHttpService = {
                    makeGetRequest: jest.fn().mockReturnValue({ data: {}})
                }

                omdbApiService = new OmdbApiService(mockedHttpService);
            });

            it('Should return an empty array', async () => {
                const movies = await omdbApiService.getManyMovies(createGetManyMoviesParameters());
                expect(movies).toEqual([]);
            });
        });
    });

    describe('getMovieById', () => {
        describe('When movie exists', () => {
            const movieData = {
                Title: faker.random.alphaNumeric(10),
                Poster: faker.random.alphaNumeric(10),
                Type: faker.random.alphaNumeric(10),
                Year: faker.random.alphaNumeric(10),
                imdbID: faker.random.alphaNumeric(10),
            }

            beforeAll(() => {
                const mockedHttpService = {
                    makeGetRequest: jest.fn().mockReturnValue({ data: movieData })
                }

                omdbApiService = new OmdbApiService(mockedHttpService);
            });

            it('Should return found movie', async () => {
                const movie = await omdbApiService.getMovieById('');
                expect(movie).toEqual(movieData);
            });
        });

        describe('When movie does not exist', () => {
            beforeAll(() => {
                const mockedHttpService = {
                    makeGetRequest: jest.fn().mockReturnValue({ data: { Error: 'error' } })
                }

                omdbApiService = new OmdbApiService(mockedHttpService);
            });

            it('Should return null', async () => {
                const movie = await omdbApiService.getMovieById('');
                expect(movie).toBeNull();
            });
        });
    });
});

const createGetManyMoviesParameters = (): IGetManyMoviesParameters => {
    return {
        query: faker.random.alphaNumeric(10),
        page: faker.random.number(10)
    }
};