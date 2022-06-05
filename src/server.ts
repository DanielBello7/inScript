


// imports
import express, { Application } from 'express';
import api from './routes/index.routes';
import compression from 'compression';
import path from 'path';
import cors from 'cors';
import upload from 'express-fileupload';
import { HandleError } from './middlewares/handleError';



// main server application
function ServerApp() {

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


     app.use(HandleError);
     app.use('/api', api());


     // return the app
     return app;
}



// export express app to server
export default ServerApp