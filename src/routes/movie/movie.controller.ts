import { NextFunction, Request, Response } from 'express';
import { Constants } from '../../common/constants';
import { MoviesService } from './movie.service';

export class MovieController {
    constructor(private readonly _movieService = new MoviesService()) {
        this.getMany = this.getMany.bind(this);
        this.getById = this.getById.bind(this);
    }

    public async getMany(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await this._movieService.getMany(req);
            res.status(Constants.STATUS_CODE.OK).json(data);
        } catch(error) {
            next(error);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await this._movieService.getById(req);
            res.status(Constants.STATUS_CODE.OK).json(data);
        } catch(error) {
            next(error);
        }
    }
}