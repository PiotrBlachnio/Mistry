import { Application } from 'express';
import request, { Response } from 'supertest';
import { Constants } from '../common/constants';
import config from '../config';
import { Server } from '../server';

let app: Application;

beforeAll(async () => {
    const server = new Server(config.APP.PORT);

    await server.start();

    app = server.getApp();
});

describe('Book API', () => {
    let response: Response;

    describe(`GET ${Constants.ENDPOINT.BOOK.GET_MANY}`, () => {
        describe('When \'query\' parameter does not exist', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_MANY}`);
                done();
            });
            
            it(`Should return status code ${Constants.STATUS_CODE.BAD_REQUEST}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.BAD_REQUEST);
            });

            it(`Should return error id ${Constants.EXCEPTION.INVALID_QUERY}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_QUERY);
            });
        });

        describe('When \'maxResults\' parameter is string', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_MANY}?query=flowers&maxResults=test`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.BAD_REQUEST}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.BAD_REQUEST);
            });

            it(`Should return error id ${Constants.EXCEPTION.INVALID_QUERY}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_QUERY);
            });
        });

        describe('When \'maxResults\' parameter is lower than 1', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_MANY}?query=flowers&maxResults=0`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.BAD_REQUEST}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.BAD_REQUEST);
            });

            it(`Should return error id ${Constants.EXCEPTION.INVALID_QUERY}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_QUERY);
            });
        });

        describe('When \'maxResults\' parameter is bigger than 40', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_MANY}?query=flowers&maxResults=45`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.BAD_REQUEST}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.BAD_REQUEST);
            });

            it(`Should return error id ${Constants.EXCEPTION.INVALID_QUERY}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_QUERY);
            });
        });

        describe('When \'startIndex\' parameter is string', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_MANY}?query=flowers&maxResults=5&startIndex=test`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.BAD_REQUEST}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.BAD_REQUEST);
            });

            it(`Should return error id ${Constants.EXCEPTION.INVALID_QUERY}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_QUERY);
            });
        });

        describe('When \'startIndex\' parameter is lower than 1', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_MANY}?query=flowers&maxResults=5&startIndex=0`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.BAD_REQUEST}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.BAD_REQUEST);
            });

            it(`Should return error id ${Constants.EXCEPTION.INVALID_QUERY}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_QUERY);
            });
        });

        describe('When \'startIndex\' parameter is bigger than 100', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_MANY}?query=flowers&maxResults=5&startIndex=150`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.BAD_REQUEST}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.BAD_REQUEST);
            });

            it(`Should return error id ${Constants.EXCEPTION.INVALID_QUERY}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_QUERY);
            });
        });

        describe('When books do not exist and no additional parameters are provided', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_MANY}?query=goaughsgnrignwomnwthwonf`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.OK}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.OK);
            });

            it('Should return empty array', () => {
                expect(response.body).toEqual([]);
            });
        });

        describe('When books do not exist and additional parameters are provided', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_MANY}?query=goaughsgnrignwomnwthwonf&maxResults=10&startIndex=3`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.OK}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.OK);
            });

            it('Should return empty array', () => {
                expect(response.body).toEqual([]);
            });
        });

        describe('When books exists and no additional parameters are provided', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_MANY}?query=flowers`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.OK}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.OK);
            });

            it(`Should return array with ${Constants.BOOK.DEFAULT_MAX_RESULTS} elements`, () => {
                expect(response.body).toHaveLength(Constants.BOOK.DEFAULT_MAX_RESULTS);
            });
        });

        describe('When books exists and additional parameters are provided', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_MANY}?query=flowers&maxResults=10&startIndex=5`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.OK}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.OK);
            });

            it(`Should return array with 10 elements`, () => {
                expect(response.body).toHaveLength(10);
            });
        });
    });

    describe(`GET ${Constants.ENDPOINT.BOOK.GET_BY_ID}`, () => {
        describe('When book does not exist', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_BY_ID.replace(':id', 'test')}`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.NOT_FOUND}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.NOT_FOUND);
            });

            it(`Should return error id ${Constants.EXCEPTION.BOOK_NOT_FOUND}`, () => {
                expect(response.body.error.id).toEqual(Constants.EXCEPTION.BOOK_NOT_FOUND);
            });
        });

        describe('When book exists', () => {
            beforeAll(async (done) => {
                response = await request(app).get(`${config.APP.PREFIX}/${Constants.ENDPOINT.BOOK.GET_BY_ID.replace(':id', 'fiBbdJ1sdA8C')}`);
                done();
            });

            it(`Should return status code ${Constants.STATUS_CODE.OK}`, () => {
                expect(response.status).toEqual(Constants.STATUS_CODE.OK);
            });

            it(`Should return found book`, () => {
                expect(response.body.id).toEqual('fiBbdJ1sdA8C');
            });
        });
    });
});