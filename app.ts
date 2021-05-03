import dotenv from 'dotenv';
import Server from './models/server';

//Configuración
dotenv.config();

const server = new Server();

server.listen();