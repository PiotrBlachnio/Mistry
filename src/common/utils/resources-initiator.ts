import { Application } from 'express';
import config from '../../config';
import { ConfigValidator } from './config-validator';
import { Logger } from './logger';
import cors from 'cors';
import { Constants } from '../constants';
import { catchExceptions } from '../middlewares/catch-exceptions.middleware';
import routers from '../../routes';

export class ResourcesInitiator {
    public static async init(app: Application): Promise<void> {
        await ConfigValidator.validate(config);
        
        this._createExceptionListeners();
        
        app.use(cors());

        this._renderRoutes(app);
        
        app.use(catchExceptions);
    }

    private static _createExceptionListeners(): void {
        process.on('uncaughtException', (error) => {
            Logger.log(error.message, Constants.COLOR.RED);
            process.exit(1);
        });

        process.on('unhandledRejection', (error) => {
            Logger.log(error as string, Constants.COLOR.RED);
        });
    }

    private static _renderRoutes(app: Application): void {
        Object.values(routers).forEach(router => app.use(config.APP.PREFIX, router));
    }
}