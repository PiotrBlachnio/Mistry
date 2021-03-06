import { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import yaml from 'yamljs';
import cors from 'cors';
import config from '../../config';
import { ConfigValidator } from './config-validator';
import { Logger } from './logger';
import { Constants } from '../constants';
import { catchExceptions } from '../middlewares/catch-exceptions.middleware';
import routers from '../../routes';
import defaultRouter from '../../routes/default';

export class ResourcesInitiator {
    public static async init(app: Application): Promise<void> {
        await ConfigValidator.validate(config);
        
        this._initiateExceptionListeners();
        
        app.use(cors());

        this._renderRoutes(app);
        
        app.use(catchExceptions);
    }

    private static _initiateExceptionListeners(): void {
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

        const swaggerDocs = yaml.load(path.join(__dirname, '/../../../swagger.yml'));
        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
        
        app.use('*', defaultRouter);
    }
}