import config from './config';
import { Server } from './server';

const server = new Server(config.APP.PORT);
server.start();