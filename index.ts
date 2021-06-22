import express from 'express';
import cookieParser from 'cookie-parser';

const app:any = express();

import { Get } from './db/get';
import { CheckAuth } from './db/checkauth';
import { AddRemLike } from './db/likes';
import { GetStory } from './db/get_story';

app.set('views', __dirname + '/site')
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/site"));
app.use(express.static(__dirname + "/site/js"));
app.use(express.static(__dirname + "/site/css"));
app.use(cookieParser());

let liked = 0;

// Axios

app.get('*/get', async(req:express.Request, res:express.Response) => {
    try {
        let get:any = await Get();
        res.json({result: true, get, liked});
    }
    catch(err:any) {
        res.json({result: false, status: 520, description: 'Unknown Error'});
    }
});

app.post('*/likequote', async(req:express.Request, res:express.Response) => {
    try {
        let result:any = await CheckAuth(req.cookies.token);
        if(result == 0) 
            res.json({result: true, auth: false});
        result = await AddRemLike(result.res[0].id, result.liked, req.query.id, 'quote');
        res.json(result);
    }catch(err:any) {
        res.status(520);
    }
});

// EJS

app.get('/', async(req:express.Request, res:express.Response) => {
    try {
        let result:any = await CheckAuth(req.cookies.token);
        liked = result.liked;
        if(result == 0)
            res.render('index', {result: true, auth: false});
        else
            res.render('index', {result: true, auth: true, photo: result.res[0].photo});
    }catch(err:any) {
        res.render('index', {result: false, auth: false, status: 520, description: 'Unknown Error'});
    }
});

// app.get('/story', async(req:express.Request, res:express.Response) => {
//     try {
//         if(req.query.id === undefined) res.render('404', {result: false, status: 404, description: 'Not found'});
//         else {
//             let result:any = await GetStory(req.query.id);
//             if(result == 0) 
//                 res.render('404', {result: false, status: 404, description: 'Not found'});
//             else 
//                 res.render('index', result);
//         }
//     }catch(err:any) {
//         res.render('404', {result: false, status: 520, description: 'Unknown Error'});
//     }
// });

// PORT

app.listen(3000, (req: express.Request, res: express.Response) => {
    console.log('Started!');
});