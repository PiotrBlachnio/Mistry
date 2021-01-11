import { GoogleApiService } from '../google-api.service';
import { IGetManyBooksParameters } from '../interfaces/IGetManyBooksParameters';
import faker from 'faker';

describe('GoogleApiService', () => {
    let googleApiService: GoogleApiService;

    const bookResponseData = {
        id: faker.random.alphaNumeric(10),
        volumeInfo: {
            title: faker.random.alphaNumeric(10),
            authors: [faker.random.alphaNumeric(10)],
            publisher: faker.random.alphaNumeric(10),
            publishedDate: faker.random.alphaNumeric(10)
        }
    };
    
    const mappedBookData = {
        id: bookResponseData.id,
        title: bookResponseData.volumeInfo.title,
        author: bookResponseData.volumeInfo.authors[0],
        publisher: bookResponseData.volumeInfo.publisher,
        publishedDate: bookResponseData.volumeInfo.publishedDate
    }

    describe('getManyBooks', () => {
        describe('When books exist', () => {
            beforeAll(() => {
                const mockedHttpService = {
                    makeGetRequest: jest.fn().mockReturnValue({ data: { items: [bookResponseData] }})
                }

                googleApiService = new GoogleApiService(mockedHttpService);
            });

            it('Should return found books', async () => {
                const books = await googleApiService.getManyBooks(createGetManyBooksParameters());
                expect(books).toEqual([mappedBookData]);
            });
        });

        describe('When books do not exist', () => {
            beforeAll(() => {
                const mockedHttpService = {
                    makeGetRequest: jest.fn().mockReturnValue({ data: {}})
                }

                googleApiService = new GoogleApiService(mockedHttpService);
            });

            it('Should return an empty array', async () => {
                const books = await googleApiService.getManyBooks(createGetManyBooksParameters());
                expect(books).toEqual([]);
            });
        });
    });

    describe('getBookById', () => {
        describe('When book exists', () => {
            beforeAll(() => {
                const mockedHttpService = {
                    makeGetRequest: jest.fn().mockReturnValue({ data: bookResponseData })
                }

                googleApiService = new GoogleApiService(mockedHttpService);
            });

            it('Should return found book', async () => {
                const book = await googleApiService.getBookById('');
                expect(book).toEqual(mappedBookData);
            });
        });

        describe('When response code equals 404', () => {
            beforeAll(() => {
                const mockedHttpService = {
                    makeGetRequest: jest.fn().mockRejectedValue({ response: { status: 404 }})
                }

                googleApiService = new GoogleApiService(mockedHttpService);
            });

            it('Should return null', async () => {
                const book = await googleApiService.getBookById('');
                expect(book).toBeNull();
            });
        });

        describe('When response code equals 503', () => {
            beforeAll(() => {
                const mockedHttpService = {
                    makeGetRequest: jest.fn().mockRejectedValue({ response: { status: 503 }})
                }

                googleApiService = new GoogleApiService(mockedHttpService);
            });

            it('Should return null', async () => {
                const book = await googleApiService.getBookById('');
                expect(book).toBeNull();
            });
        });

        describe('When response code is neither 404 nor 503', () => {
            beforeAll(() => {
                const mockedHttpService = {
                    makeGetRequest: jest.fn().mockRejectedValue({ response: { status: faker.random.number() }})
                }

                googleApiService = new GoogleApiService(mockedHttpService);
            });

            it('Should return throw an error', async (done) => {
                try {
                    await googleApiService.getBookById('');
                } catch(error) {
                    expect(error).toBeDefined();
                    done();
                };
            });
        });
    });
});

const createGetManyBooksParameters = (): IGetManyBooksParameters => {
    return {
        query: faker.random.alphaNumeric(10),
        maxResults: faker.random.number(),
        startIndex: faker.random.number()
    }
};