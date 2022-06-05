


import bunyan from 'bunyan';
import path from 'path';


// create logger
const Log = bunyan.createLogger({
     name: 'dev', 
     level: 'debug', 
     src: true,
     streams: [
          {
               // this enables that you can have the logs shown on the console
               level: 'info',
               stream: process.stdout
          },
          {
               // this saves all the informtion to a log file
               level: 'info',
               path: path.join(__dirname, '../logs/bunyan.log')
          },
          {
               level: 'error',
               path: path.join(__dirname, '../logs/bunyan-errors.log')
          }
     ]
});




export default Log;