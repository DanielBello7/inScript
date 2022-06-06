


// imports
import express, { Application } from 'express';
import api from './routes/index.routes';
import compression from 'compression';
import path from 'path';
import cors from 'cors';
import upload from 'express-fileupload';
import ExpressSecret from './config/secret.config';
import { 
     HandleIconError, 
     HandlePageNotFound 
} from './middlewares/ErrorHandlers';
import { DatabaseType } from './types/Database.type';


// main server application
function ServerApp(conn: DatabaseType) {

     // create express app
     const app: Application = express();

     // list of accepted domain names
     const whiteList = ['http://localhost:3000'];

     // middlewares
     app.use(cors({
          credentials: true,
          origin: whiteList
     }));
     app.use(compression());
     app.use(express.json());
     app.use(upload());
     app.use('/static', express.static(path.join(__dirname, 'static')));
     app.use(express.urlencoded({extended: true}));
     app.use(ExpressSecret);

     app.use(HandleIconError);
     app.use('/api', api(conn));

     app.use(HandlePageNotFound);
     

     // return the app
     return app;
}



// export express app to server
export default ServerApp