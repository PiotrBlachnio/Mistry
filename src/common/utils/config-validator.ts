import { object, string, number } from 'joi';
import globalConfig from '../../config';
import { Constants } from '../constants';
import { Logger } from './logger';

export class ConfigValidator {
    public static async validate(config: typeof globalConfig): Promise<void> {
        try {
            const validationSchema = this._getValidationSchema();
            await validationSchema.validateAsync(config);
        } catch(error) {
            this._printErrorMessageAndExit(error.message);
        }
    }
    
    private static _getValidationSchema() {
        return object({
            APP: {
                MODE: string().valid(Constants.APP_MODE.DEV, Constants.APP_MODE.PROD, Constants.APP_MODE.TEST),
                PREFIX: string(),
                PORT: number().min(1).max(65353)
            }
        });
    }
    
    private static _printErrorMessageAndExit(message: string): void {
        Logger.log(`Environmental variable error: ${message}`, Constants.COLOR.RED);
        process.exit(1);
    }
}