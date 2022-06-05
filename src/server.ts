


// imports

import { initializeFromMongoose } from './middlewares/passport';
import express, { Application } from 'express';
import api from './routes/index.routes';
import cookieParser from 'cookie-parser';
// import MongoStore from 'connect-mongo';
import session from 'express-session';
import compression from 'compression';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import upload from 'express-fileupload';
import { HandleError } from './middlewares/handleError';
import { HandleVisits } from './middlewares/handleVisits';
// import xss from 'xss-clean/lib/xss';



// configure env files
if (process.env.NODE_ENV === 'prod') dotenv.config({path: path.join(__dirname, "./env/prod.env")});

else dotenv.config({path: path.join(__dirname, "./env/dev.env")});



initializeFromMongoose(passport);



// create express app
const app: Application = express();



// list of accepted domain names
const whiteList = ['http://localhost:3000'];

app.use(cors({
     credentials: true,
     origin: whiteList
}));
app.use(compression());
app.use(express.json());
app.use(upload());
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({extended: true}));
// app.use(xss())



app.use(session({
     resave: true,
     secret: 'inScript-12345',
     saveUninitialized: true,
     cookie: {
          sameSite: 'lax',
          secure: false,
          maxAge: 1000 * 60 * 60 * 24
     },
     // store: MongoStore.create({mongoUrl: process.env.MONGO, collectionName: 'sessions'})
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(HandleError);
app.use(HandleVisits);
app.use('/api', api());



// export express app to server
export default () => app;