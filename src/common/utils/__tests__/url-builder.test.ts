import faker from 'faker';
import config from '../../../config';
import { UrlBuilder } from '../url-builder';

describe('UrlBuilder', () => {
    describe('getManyBooksUrl', () => {
        it('Should return correct url', () => {
            const query = faker.random.alphaNumeric(10);
            const maxResults = faker.random.number(10);
            const startIndex = faker.random.number(10);
    
            const actual = UrlBuilder.getManyBooksUrl({ query, maxResults, startIndex });
            const expected = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}&key=${config.BOOK.API_KEY}`;
    
            expect(actual).toEqual(expected);
        });  
    });

    describe('getBookByIdUrl', () => {
        it('Should return correct url', () => {
            const id = faker.random.alphaNumeric(10);
    
            const actual = UrlBuilder.getBookByIdUrl(id);
            const expected = `https://www.googleapis.com/books/v1/volumes/${id}?key=${config.BOOK.API_KEY}`;
    
            expect(actual).toEqual(expected);
        });
    });
});