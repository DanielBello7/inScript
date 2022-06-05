


// imports
import mongoose from 'mongoose';


// connect function
async function connect(databaseURL: string, callback?: Function) {
     const databaseOptions: mongoose.ConnectOptions = {}
     return await mongoose.connect(databaseURL, databaseOptions, () => callback && callback());
}


// main exports
export default connect;