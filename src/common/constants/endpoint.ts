export const Endpoint = {
    BOOK: {
        GET_MANY: '/book',
        GET_BY_ID: '/book/:id'
    },
    MOVIE: {
        GET_MANY: '/movie',
        GET_BY_ID: '/movie/:id'
    }
} as const;