import { Exception } from './exception';
import { StatusCode } from './status-code';

export const DefaultException = {
    ID: Exception.DEFAULT,
    STATUS: StatusCode.INTERNAL_SERVER_ERROR,
    MESSAGE: 'Internal server error'
} as const;