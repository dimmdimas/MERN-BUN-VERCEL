import mongoose from "mongoose";    
import env from "./env";

const connect = async () => {
    await mongoose.connect(env.DATABASE, {
        dbName: 'Alone'
    });

    return Promise.resolve('Database connect')
}

export default connect;