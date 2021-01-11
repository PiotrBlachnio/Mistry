import { AppMode } from './app-mode';
import { Book } from './book';
import { Color } from './color';
import { DefaultException } from './default-exception';
import { Endpoint } from './endpoint';
import { Exception } from './exception';
import { Movie } from './movie';
import { StatusCode } from './status-code';

export const Constants = {
    APP_MODE: AppMode,
    BOOK: Book,
    COLOR: Color,
    DEFAULT_EXCEPTION: DefaultException,
    ENDPOINT: Endpoint,
    EXCEPTION: Exception,
    MOVIE: Movie,
    STATUS_CODE: StatusCode
} as const;