import express, { Application } from 'express';
import userRoutes from '../routes/usuarios'
import cors from 'cors';
import db from '../db/config';
class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.routes();
        this.middlewares();
    }

    async dbConnection() {
        try {
            await db.authenticate();
        } catch (error) {
            throw new Error("ERROR:"+error);

        }
    }

    //Funciones antes de otros procedimientos
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port)
        })
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }
}

export default Server;