import express, { Application } from 'express';
import { Server as HttpServer } from 'http';

export class Server {
    private readonly _port: number;
    private readonly _app: Application;
    private _server: HttpServer | undefined;

    constructor(port: number) {
        this._port = port;
        this._app = express();
    }

    public async start(): Promise<void> {
        this._server = this._app.listen(this._port, () => logger.cyan(`Server is running on port ${this._port}`));
    }

    public stop(): void {
        this._server?.close();
    }
}