import { Application } from 'express';
import { Constants } from '../common/constants';
import config from '../config';
import { Server } from '../server';
import request, { Response } from 'supertest';

const server = new Server(config.APP.PORT);
let app: Application;

beforeAll(async () => {
    await server.start();
    app = server.getApp();
});

afterAll(() => {
    server.close();
});

describe('Movie API', () => {
    let response: Response;
    
    describe(`GET ${Constants.ENDPOINT.MOVIE.GET_MANY}`, () => {
        describe('When \'query\' parameter does not exist', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.MOVIE.GET_MANY}`);
                done();
            });
            
            it(`Should return status code ${Constants.STATUS_CODE.BAD_REQUEST}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.BAD_REQUEST);
            });

            it(`Should return error id ${Constants.EXCEPTION.INVALID_QUERY}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_QUERY);
            });
        });

        describe('When \'page\' parameter is string', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.MOVIE.GET_MANY}?query=flowers&page=test`);
                done();
            });
            
            it(`Should return status code ${Constants.STATUS_CODE.BAD_REQUEST}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.BAD_REQUEST);
            });

            it(`Should return error id ${Constants.EXCEPTION.INVALID_QUERY}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_QUERY);
            });
        });

        describe('When \'page\' parameter is lower than 1', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.MOVIE.GET_MANY}?query=flowers&page=0`);
                done();
            });
            
            it(`Should return status code ${Constants.STATUS_CODE.BAD_REQUEST}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.BAD_REQUEST);
            });

            it(`Should return error id ${Constants.EXCEPTION.INVALID_QUERY}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_QUERY);
            });
        });

        describe('When \'page\' parameter is bigger than 100', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.MOVIE.GET_MANY}?query=flowers&page=105`);
                done();
            });
            
            it(`Should return status code ${Constants.STATUS_CODE.BAD_REQUEST}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.BAD_REQUEST);
            });

            it(`Should return error id ${Constants.EXCEPTION.INVALID_QUERY}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_QUERY);
            });
        });

        describe('When movies do not exist and no additional parameters are provided', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.MOVIE.GET_MANY}?query=goaughsgnrignwomnwthwonf`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.OK}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.OK);
            });

            it('Should return empty array', () => {
                expect(response.body).toEqual([]);
            });
        });

        describe('When movies do not exist and additional parameters are provided', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.MOVIE.GET_MANY}?query=goaughsgnrignwomnwthwonf&page=10`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.OK}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.OK);
            });

            it('Should return empty array', () => {
                expect(response.body).toEqual([]);
            });
        });

        describe('When movies exist and no additional parameters are provided', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.MOVIE.GET_MANY}?query=flowers`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.OK}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.OK);
            });

            it(`Should return array with 5 elements`, () => {
                expect(response.body).toHaveLength(10);
            });
        });

        describe('When movies exist and additional parameters are provided', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.MOVIE.GET_MANY}?query=flowers&page=5`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.OK}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.OK);
            });

            it(`Should return array with 5 elements`, () => {
                expect(response.body).toHaveLength(10);
            });
        });
    });

    describe(`GET ${Constants.ENDPOINT.MOVIE.GET_BY_ID}`, () => {
        describe('When movie does not exist', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.MOVIE.GET_BY_ID.replace(':id', 'test')}`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.NOT_FOUND}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.NOT_FOUND);
            });

            it(`Should return error id ${Constants.EXCEPTION.MOVIE_NOT_FOUND}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.MOVIE_NOT_FOUND);
            });
        });

        describe('When movie exists', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.MOVIE.GET_BY_ID.replace(':id', 'tt1410063')}`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.OK}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.OK);
            });

            it(`Should return found movie`, () => {
                expect(response.body.id).toEqual('tt1410063');
            });
        });
    });
});