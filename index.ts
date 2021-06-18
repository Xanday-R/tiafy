import express from 'express';
import cookieParser from 'cookie-parser';

const app:any = express();

import { Get } from './db/get';
import { CheckAuth } from './db/checkauth';
import { AddRemLike } from './db/likes';
import { GetStory } from './db/get_story';

app.set('views', __dirname + '/site/story')
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/site"));
app.use(express.static(__dirname + "/site/quote/"));
app.use(express.static(__dirname + "/site/quote/404"));
app.use(cookieParser());

// Axios

app.get('*/checkauth', async(req:express.Request, res:express.Response) => {
    try {
        let result:any = await CheckAuth(req.cookies.token);
        if(result == 0)
            res.json({result: true, auth: false});
        else
            res.json({result: true, auth: true, photo: result.res[0].photo, liked: result.liked});
    }catch(err:any) {
        res.json({result: false, auth: false, status: 520, description: 'Unknown Error'});
    }
});

app.get('*/get', async(req:express.Request, res:express.Response) => {
    try {
        let get:any = await Get();
        res.json({result: true, get});
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

app.get('/story', async(req:express.Request, res:express.Response) => {
    try {
        if(req.query.id === undefined) res.render('404/404', {result: false, status: 404, description: 'Not found'});
        else {
            let result:any = await GetStory(req.query.id);
            if(result == 0) 
                res.render('404/404', {result: false, status: 404, description: 'Not found'});
            else 
                res.render('index', result);
        }
    }catch(err:any) {
        res.render('404/404', {result: false, status: 520, description: 'Unknown Error'});
    }
});

// PORT

app.listen(3000, (req: express.Request, res: express.Response) => {
    console.log('Started!');
});