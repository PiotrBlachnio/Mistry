import { IAccessInfo } from './IAccessInfo';
import { ISaleInfo } from './ISaleInfo';
import { IVolumeInfo } from './IVolumeInfo';

export interface IBookData {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: IVolumeInfo;
    saleInfo: ISaleInfo;
    accessInfo: IAccessInfo;
}