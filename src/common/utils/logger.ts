import { cyan } from 'chalk';

export class Logger {
    public static cyan(text: string): void {
        console.log(cyan(text));
    }
}