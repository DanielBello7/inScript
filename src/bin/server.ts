


// please keep in mind that ts-node would only allow "app" 
// to run when the file you are importing from is the same name or named
// server also


// imports
import connect from '../middlewares/databaseConnection';
import { ErrorHandler } from '../types/ErrorType.type';
import Log from '../config/bunyan.config'; 
import app from '../server';
import http from 'http';



// get app from server app function
const serverApp = app();



// create http server
const server = http.createServer(serverApp);


const port = process.env.PORT || 2022;
serverApp.set('port', port);



// function for when the server start
function onListening() {
     return Log.info(`server active on port:${port}`);
}




//function to catch errors
function onError(error: ErrorHandler){
  
     switch (error.code) {
          case 'EACCES':
               Log.error(error.message);
               process.exit(1);
               break;


          case 'EADDRINUSE':
               Log.error(error.message);
               process.exit(1);
               break;


          default:
               throw error;
  }
}





// server event listeners
server.on('listening', onListening);
server.on('error', onError);




connect(process.env.MONGO as string, () => {
     Log.info('connected to database');
     server.listen(port);
});