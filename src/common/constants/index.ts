import { AppMode } from './app-mode';
import { Color } from './color';
import { DefaultException } from './default-exception';
import { StatusCode } from './status-code';

export const Constants = {
    APP_MODE: AppMode,
    COLOR: Color,
    DEFAULT_EXCEPTION: DefaultException,
    STATUS_CODE: StatusCode
} as const;