import globalConfig from '../../../config';
import faker from 'faker';
import { Constants } from '../../constants';
import { ConfigValidator } from '../config-validator';

describe('ConfigValidator.validate', () => {
    const config = {
        APP: {
            MODE: Constants.APP_MODE.TEST,
            PREFIX: 'api/v1/',
            PORT: 4000
        },
        BOOK: {
            API_KEY: faker.random.alphaNumeric(10)
        }
    }; 
    
    describe('When APP.MODE is invalid', () => {
        beforeAll(() => {
            //@ts-expect-error
            config.APP.MODE = faker.random.word();
        });
        
        it('Should call process.exit with code 1', async () => {
            await checkConfig(config);
        });

        afterAll(() => {
            config.APP.MODE = Constants.APP_MODE.TEST;
            jest.clearAllMocks();
        });
    });

    describe('When APP.PREFIX is invalid', () => {
        beforeAll(() => {
            //@ts-expect-error
            config.APP.PREFIX = faker.random.number();
        });
        
        it('Should call process.exit with code 1', async () => {
            await checkConfig(config);
        });

        afterAll(() => {
            config.APP.PREFIX = '/api/v1';
            jest.clearAllMocks();
        });
    });

    describe('When APP.PORT is invalid', () => {
        beforeAll(() => {
            config.APP.PORT = 0;
        });
        
        it('Should call process.exit with code 1', async () => {
            await checkConfig(config);
        });

        afterAll(() => {
            config.APP.PORT = 4000;
            jest.clearAllMocks();
        });
    });

    describe('When BOOK.API_KEY is invalid', () => {
        beforeAll(() => {
            config.BOOK.API_KEY = '';
        });
        
        it('Should call process.exit with code 1', async () => {
            await checkConfig(config);
        });

        afterAll(() => {
            config.BOOK.API_KEY = faker.random.alphaNumeric(10);
            jest.clearAllMocks();
        });
    });

    describe('When all variables are valid', () => {
        it('Should not call process.exit', async () => {
            await checkConfig(config, false);
        });
    });
}); 

async function checkConfig(config: typeof globalConfig, isCalled: boolean = true): Promise<void> {
    const mockedExit = jest.spyOn(process, 'exit').mockImplementation(number => number as never);
    await ConfigValidator.validate(config);

    if(isCalled) {
        expect(mockedExit).toHaveBeenCalledWith(1);
    } else {
        expect(mockedExit).not.toHaveBeenCalled();
    }
}