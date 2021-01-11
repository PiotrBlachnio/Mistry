import { NextFunction, Request, Response } from 'express';
import { Constants } from '../../common/constants';
import { BookService } from './book.service';

export class BookController {
    constructor(private readonly _bookService = new BookService()) {
        this.getMany = this.getMany.bind(this);
        this.getById = this.getById.bind(this);
    }

    public async getMany(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await this._bookService.getMany(req);
            res.status(Constants.STATUS_CODE.OK).json(data);
        } catch(error) {
            next(error);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await this._bookService.getById(req);
            res.status(Constants.STATUS_CODE.OK).json(data);
        } catch(error) {
            next(error);
        }
    }
}