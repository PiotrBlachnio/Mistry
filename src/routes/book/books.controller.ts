import { NextFunction, Request, Response } from 'express';
import { Constants } from '../../common/constants';
import { BooksService } from './books.service';

export class BooksController {
    constructor(private readonly _booksService: BooksService = new BooksService()) {
        this.get = this.get.bind(this);
    }

    public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await this._booksService.get(req);
            res.status(Constants.STATUS_CODE.OK).json(data);
        } catch(error) {
            next(error);
        }
    }
}