


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
import envConfig from '../config/env.config';
import MongoConnection from '../database/mongoConnection';
// import ip from 'ip';
// import DevelopmentAPI from '../database/developmentConnection';

// use the env variables
envConfig();

// create instance of the database connection
const conn = new MongoConnection(process.env.URL as string);
// const dev = new DevelopmentAPI();


// get app from server app function
const serverApp = ServerApp(conn);
const server = http.createServer(serverApp);

// address for the ip on the public network
// const address = ip.address();
const port = process.env.PORT || 2022;
serverApp.set('port', port);


function onListening() {
   // Log.info(`server active on http://${address}:${port}`);
   Log.info(`server active on http://localhost:${port}`);
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
// this one works for opening the server on a public network
// server.listen(port, parseInt(address));
server.listen(port);