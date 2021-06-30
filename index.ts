import express from 'express';
import cookieParser from 'cookie-parser';

const app:any = express();

export let App:any = app;

// DB

import { Get } from './db/get';
import { CheckAuth } from './db/checkauth';
import { AddRemLike } from './db/likes';
import { GetStory } from './db/get_story';

// Express

import { listen } from './expess/port';


// App.use

app.set('views', __dirname + '/site')
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/site"));
app.use(express.static(__dirname + "/site/js"));
app.use(express.static(__dirname + "/site/css"));
app.use(cookieParser());

let liked = 0;

// Axios

app.post('*/get', async(req:express.Request, res:express.Response) => {
    try {
        let get:any = await Get();
        res.json({result: true, get: {quote: [[get.quote[0][0], get.quote[0][1], get.quote[0][2]], [get.quote[1][0], get.quote[1][1], get.quote[1][2]]], story: [[get.story[0][0]], [get.story[1][0]]]}, liked});
    }
    catch(err:any) {
        res.json({result: false, status: 520, description: 'Unknown Error'});
    }
});

app.post('*/likequote', async(req:express.Request, res:express.Response) => {
    try {
        let result:any = await CheckAuth(req.cookies.token, 2);
        if(result == 0) 
            res.json({result: true, auth: false});
        result = await AddRemLike(result.res[0].id, result.liked, req.query.id, 'quote');
        res.json(result);
    }catch(err:any) {
        res.status(520);
    }
});

app.post('*/likestory', async(req:express.Request, res:express.Response) => {
    try {
        let result:any = await CheckAuth(req.cookies.token, 1);
        if(result == 0) 
            res.json({result: true, auth: false});
        result = await AddRemLike(result.res[0].id, result.liked, req.query.id, 'story');
        res.json(result);
    }catch(err:any) {
        res.status(520);
    }
});

// EJS

app.get('/', async(req:express.Request, res:express.Response) => {
    try {
        let result:any = await CheckAuth(req.cookies.token, 2);
        liked = result.liked;
        if(result == 0)
            res.render('index', {result: true, auth: false});
        else
            res.render('index', {result: true, auth: true, photo: result.res[0].photo});
    }catch(err:any) {
        res.render('index', {result: false, auth: false, status: 520, description: 'Unknown Error'});
    }
});

app.get('/story', async(req:express.Request, res:express.Response) => {
    try {
        let result:any = [0, 0];
        result[0] = await CheckAuth(req.cookies.token, 1);
        if(req.query.id === undefined) {
            if(result[0] == 0)
                res.render('404', {result: false, auth: false, status: 404, description: 'Not found'});
            else
                res.render('404', {result: false, auth: true, photo: result[0].res[0].photo, status: 404, description: 'Not found'});
        }
        else {
            result[1] = await GetStory(req.query.id);
            if(result[1] == 0) {
                if(result[0] == 0)
                    res.render('404', {result: false, auth: false, status: 404, description: 'Not found'});
                else
                    res.render('404', {result: false, auth: true, photo: result[0].res[0].photo, status: 404, description: 'Not found'});
            }
            else {
                if(result[0] == 0)
                    res.render('story', {
                        result: true, 
                        auth: false, 
                        id: result[1].id, 
                        name: result[1].name, 
                        text: result[1].text, 
                        appendor: result[1].appendor, 
                        img: result[1].img, 
                        likes: result[1].likes,
                        liked: false,
                        time: result[1].time
                    });
                else {
                    let liked:any = await CheckAuth(req.cookies.token, 2);
                    for(let i in liked.liked) {
                        if(liked.liked[i].type == 'story' && liked.liked[i].idrecords == result[1].id) {
                            liked = true;
                            break
                        }
                    }
                    if(liked !== true)
                        liked = false;
                    res.render('story', {
                        result: true, 
                        auth: true, 
                        photo: result[0].res[0].photo, 
                        id: result[1].id, 
                        name: result[1].name, 
                        text: result[1].text, 
                        appendor: result[1].appendor, 
                        img: result[1].img, 
                        likes: result[1].likes, 
                        liked: liked,
                        time: result[1].time
                    });
                }
            }
        }
    }catch(err:any) {
        res.render('404', {result: false, auth: false, status: 520, description: 'Unknown Error'});
    }
});

app.get('/profile', async(req:express.Request, res:express.Response) => {
    try {
        if(req.cookies.token === undefined) 
            res.redirect('/auth');
        else {
            let result:any = await CheckAuth(req.cookies.token, 1);
            if(result == 0) 
                res.redirect('/auth');
            else res.render('profile', {
                login: result.res[0].login, 
                email: result.res[0].email, 
                photo: result.res[0].photo 
            });
        }
    }catch(err:any) {
        res.redirect('/');
    }
});

// PORT

listen();