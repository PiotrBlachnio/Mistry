import { Request, Response, NextFunction } from 'express';

export default async (err: unknown, req: Request, res: Response, next: NextFunction): Promise<Response> => { // eslint-disable-line
    // if(err instanceof GenericError) {
    //     await logger.log({ type: 'info', message: err.message, place: err.place });

    //     return res.status(err.statusCode).json({
    //         error: {
    //             message: err.message,
    //             id: err.id
    //         }
    //     });
    // };

    await logger.log({ type: 'error', message: err.message, place: err.place });
    
    return res.status(500).json({
        error: {
            message: 'Internal server error',
            id: 0
        }
    });
};