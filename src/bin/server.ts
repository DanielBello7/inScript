


// please keep in mind that 
// ts-node would only allow "app" 
// to run when the file you are 
// importing from is the same name or named
// server also


// imports
import { ErrorHandler } from '../types/ErrorType.type';
import Log from '../config/bunyan.config'; 
import ServerApp from '../server';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';


// setting the environment variables
const envPath = process.env.NODE_ENV==='dev' ? 'dev.env' : 'prod.env';
dotenv.config({path: path.join(__dirname, `../env/${envPath}`)});



// get app from server app function
const serverApp = ServerApp();
const server = http.createServer(serverApp);

const port = process.env.PORT || 2022;
serverApp.set('port', port);


function onListening() {
     Log.info(`server active on port:${port}`);
}

function onError(error: ErrorHandler){
  
     switch (error.code) {
          case 'EACCES':
               Log.error(error.message);
               return process.exit(1);

          case 'EADDRINUSE':
               Log.error(error.message);
               return process.exit(1);

          default:
               throw error;
  }
}


server.on('listening', onListening);
server.on('error', onError);


// iniitate server
server.listen(port);