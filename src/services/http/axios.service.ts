import axios from 'axios';
import { IHttpResponse } from './interfaces/IHttpResponse';
import { IHttpService } from './interfaces/IHttpService';

export class AxiosHttpService implements IHttpService {
    public async makeGetRequest(url: string, headers: Record<string, string> = {}): Promise<IHttpResponse> {
        const response = await axios.get(url, { headers });
        return response;
    }
}