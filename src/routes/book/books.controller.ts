import { NextFunction, Request, Response } from 'express';
import { Constants } from '../../common/constants';
import { BooksService } from './books.service';

export class BooksController {
    constructor(private readonly _booksService: BooksService = new BooksService()) {
        this.getMany = this.getMany.bind(this);
    }

    public async getMany(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await this._booksService.getMany(req);
            res.status(Constants.STATUS_CODE.OK).json(data);
        } catch(error) {
            next(error);
        }
    }
}