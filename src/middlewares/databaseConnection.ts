


// imports
import mongoose from 'mongoose';


async function connect(databaseURL: string, callback?: Function) {
  const databaseOptions: mongoose.ConnectOptions = {}
  return await mongoose.connect(databaseURL, databaseOptions, () => callback && callback());
}

export default connect;