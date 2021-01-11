import { IHttpResponse } from './IHttpResponse';

export interface IHttpService {
    makeGetRequest(url: string, headers?: Record<string, string>): Promise<IHttpResponse>; 
}