import { IBookData } from './interfaces/IBookData';
import { IGetManyBooksParameters } from './interfaces/IGetManyBooksParameters';
import { UrlBuilder } from '../../common/utils/url-builder';
import { IHttpService } from '../http/interfaces/IHttpService';
import { AxiosHttpService } from '../http/axios.service';

export class GoogleApiService {
    constructor(private readonly _httpService: IHttpService = new AxiosHttpService()) {}

    public async getManyBooks(parameters: IGetManyBooksParameters): Promise<IBookData[]> {
        const response = await this._httpService.makeGetRequest(UrlBuilder.getManyBooksUrl(parameters), this._getCompressionHeaders());
        const books = response.data.items || [];

        return books.map((book: Record<string, any>) => this._mapResponseToBookData(book));
    }

    public async getBookById(id: string): Promise<IBookData | null> {
        try {
            const response = await this._httpService.makeGetRequest(UrlBuilder.getBookByIdUrl(id), this._getCompressionHeaders());
            return this._mapResponseToBookData(response.data);
        } catch(error) {
            if(error.response.status === 404 || error.response.status === 503) return null;
            throw error;
        }
    }

    private _getCompressionHeaders() {
        return {
            'Accept-Encoding': 'gzip',
            'User-Agent': 'node-api (gzip)'
        }
    }

    private _mapResponseToBookData(data: Record<string, any>): IBookData {
        return {
            id: data.id,
            title: data.volumeInfo.title,
            author: data.volumeInfo.authors ? data.volumeInfo.authors[0] : 'Not available',
            publisher: data.volumeInfo.publisher,
            publishedDate: data.volumeInfo.publishedDate
        }
    }
}