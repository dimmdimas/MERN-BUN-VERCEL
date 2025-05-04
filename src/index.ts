import bodyParser from 'body-parser';
import express from 'express'
import router from './routes/api';
import connect from './utils/database';
import env from './utils/env';


export async function init() {
    try {
        const app = express();
        const db = await connect();

        app.use(bodyParser.json());
        app.use('/api', router)

        app.get('/', (req, res)=> {
            res.status(200).json({
                massage: "server is running"
            })
        })

        app.listen(env.PORT, () => {
            console.log(env.PORT)
            console.log(db);
        });
    } catch (error) {
        const err = error as Error
        console.log(err);
        
    }
}

init();