import { Request, Response } from 'express';
import { Constants } from '../../common/constants';
import { BooksService } from './books.service';

export class BooksController {
    constructor(private readonly _booksService: BooksService = new BooksService()) {
        this.get = this.get.bind(this);
    }

    public async get(req: Request, res: Response): Promise<Response> {
        const data = await this._booksService.get(req.query.q as string);
        return res.status(Constants.STATUS_CODE.OK).json(data);
    }
}