import express from 'express';

import cookieParser from 'cookie-parser';


const app:any = express();

import { Get } from './db/get';
import { CheckAuth } from './db/checkauth';
import { resourceLimits } from 'worker_threads';

app.use(express.static(__dirname + "/site"));
app.use(cookieParser());


// app.get('/', async(req:express.Request, res:express.Response) => {
//     console.log(await get());
//     res.send('Hi')
// });

app.get('*/checkauth', async(req:express.Request, res:express.Response) => {
    try {
        let result:any = await CheckAuth(req.cookies.token);
        console.log(result)
        if(result == 0)
            res.json({result: true, auth: false});
        else
            res.json({result: true, auth: true, photo: result.res[0].photo, liked: result.liked});
    }catch(err:any) {
        console.log(1);
        res.json({result: true, auth: false});
    }
});

app.get('*/get', async(req:express.Request, res:express.Response) => {
    let get:any = await Get();
    res.json({result: true, get});
});

// app.get('*/getlikes', async(req:express.Request, res:express.Response) => {
//     let get:any = await Get();
//     res.json({result: true, get});
// });


app.listen(3000, (req: express.Request, res: express.Response) => {
    console.log('Started!');
});