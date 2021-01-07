import express, { Application } from 'express';
import { Server as HttpServer } from 'http';
import { Logger } from './common/utils/logger';

export class Server {
    private readonly _port: number;
    private readonly _app: Application;
    private _server: HttpServer | undefined;

    constructor(port: number) {
        this._port = port;
        this._app = express();
    }

    public async start(): Promise<void> {
        this._server = this._app.listen(this._port, () => Logger.log(`Server is running on port ${this._port}`));
    }

    public stop(): void {
        this._server?.close();
    }
}