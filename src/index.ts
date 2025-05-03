import bodyParser from 'body-parser';
import express from 'express'
import { connect } from './utils/database';
import router from './routes/api';


export async function init() {
    try {
        const app = express();
        const db = await connect();

        app.use(bodyParser.json());
        app.use('/api', router)

        app.listen(Bun.env.PORT, () => {
            console.log(Bun.env.PORT)
            console.log(db);
        });
    } catch (error) {
        const err = error as Error
        console.log(err);
        
    }
}

init();