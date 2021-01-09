import { Logger } from '../logger';
import config from '../../../config';
import { Constants } from '../../constants';
import { Color } from '../../constants/color';
import { red } from 'chalk';

describe('Logger.log', () => {
    describe('Color.WHITE', () => {
        describe('When in testing environment', () => {
            it('Should not call console.log', () => {
                const mockedConsole = callLoggerWithMockedConsole(Constants.COLOR.WHITE);
                expect(mockedConsole).not.toHaveBeenCalled();
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });

        describe('When not in testing environment', () => {
            beforeAll(() => {
                //@ts-expect-error
                config.APP.MODE = Constants.APP_MODE.DEV;
            });

            it('Should call console.log without any additional color', () => {
                const mockedConsole = callLoggerWithMockedConsole(Constants.COLOR.WHITE);
                expect(mockedConsole).toHaveBeenCalledWith('test');
            });

            afterAll(() => {
                //@ts-expect-error
                config.APP.MODE = Constants.APP_MODE.TEST;
                jest.clearAllMocks();
            });
        });
    });

    describe('Color.RED', () => {
        describe('When in testing environment', () => {
            it('Should not call console.log', () => {
                const mockedConsole = callLoggerWithMockedConsole(Constants.COLOR.RED);
                expect(mockedConsole).not.toHaveBeenCalled();
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });

        describe('When not in testing environment', () => {
            beforeAll(() => {
                //@ts-expect-error
                config.APP.MODE = Constants.APP_MODE.DEV;
            });

            it('Should call console.log without any additional color', () => {
                const mockedConsole = callLoggerWithMockedConsole(Constants.COLOR.RED);
                expect(mockedConsole).toHaveBeenCalledWith(red('test'));
            });

            afterAll(() => {
                //@ts-expect-error
                config.APP.MODE = Constants.APP_MODE.TEST;
                jest.clearAllMocks();
            });
        });
    });
});

function callLoggerWithMockedConsole(color: Color): jest.SpyInstance {
    const mockedConsole = jest.spyOn(console, 'log').mockImplementation(log => log);

    Logger.log('test', color); 

    return mockedConsole;
}