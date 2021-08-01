import express from 'express';
import cookieParser from 'cookie-parser';

const app:any = express();

export let App:any = app;

// DB

import { CheckAuth } from './db/checkauth';
import { AddRemLike } from './db/likes';
import { GetStory } from './db/get_story';
import { UpdPass } from './db/upd_pass';
import { UpdToken } from './db/upd_token';
import { UpdLogin } from './db/upd_login';
import { AddDiaryEntry } from './db/add_diaryentry';
import { AddVideoImage } from './db/add_video_image';
import { AddStory } from './db/add_story';
import { AddQuote } from './db/add_quote';

import { GetAll } from './db/get_all';

// Multer

import multer from 'multer';
import fs from 'fs';

import { UploadPhoto } from './jimp/main';

// Token

import { GenerateToken } from './other/gentoken';
import { addCookie } from './other/add_cookie';


let upload:any = multer({
    dest: __dirname + '/photo', 
    fileFilter: function(req:Express.Request, file:any, cb:multer.FileFilterCallback) {
        if(file!.mimetype == 'image/jpeg' || file!.mimetype == 'image/jpg' || file!.mimetype == 'image/png' || file!.mimetype == 'image/gif' || file!.mimetype == 'image/tiff')
            cb(null, true);
        else
            cb(null, false);
    }
}).single('File');

let uploadManyPhoto:any = multer({
    dest: __dirname + '/photo', 
    fileFilter: function(req:Express.Request, file:any, cb:multer.FileFilterCallback) {
        if(file!.mimetype == 'image/jpeg' || file!.mimetype == 'image/jpg' || file!.mimetype == 'image/png' || file!.mimetype == 'image/gif' || file!.mimetype == 'video/mp4' || file!.mimetype == 'video/avi' || file!.mimetype == 'video/webm' || file!.mimetype == 'image/tiff')
            cb(null, true);
        else
            cb(null, false);
    },
}).fields([{name: 'File', maxCount: 10}]);

// Body-parser

const bodyParser = require('body-parser');
const urlencodedParser:any = bodyParser.urlencoded({extended: false});

// Express

import { listen } from './other/port';
import { GetDiaryOrStoryForUser } from './db/get_for_user';

// App.use

app.set('views', __dirname + '/site')
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/site"));
app.use(express.static(__dirname + "/site/js"));
app.use(express.static(__dirname + "/site/css"));
app.use(cookieParser());


let inform:any = null;

// Axios

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
        let result:any = await CheckAuth(req.cookies.token, 2);
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
        let result:any = await CheckAuth(req.cookies.token, 1);
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
            else  {
                let data:any = new GetAll(result.res[0].id);
                data = [
                    await data.GetDiary(),
                    await data.GetStory(),
                    await data.GetQuote()
                ]
                res.render('profile', {
                    login: result.res[0].login, 
                    email: result.res[0].email, 
                    photo: result.res[0].photo,
                    diary: data[0],
                    story: data[1],
                    quote: data[2]
                });
            }
        }
    }catch(err:any) {
        res.redirect('/');
    }
});

app.get('/profile-settings', async(req:express.Request, res:express.Response) => {
    try {
        if(req.cookies.token === undefined) 
            res.redirect('/auth');
        else {
            let result:any = await CheckAuth(req.cookies.token, 1);
            if(result == 0) 
                res.redirect('/auth');
            else res.render('profile_settings', {
                login: result.res[0].login, 
                email: result.res[0].email, 
                photo: result.res[0].photo 
            });
        }
    }catch(err:any) {
        res.redirect('/');
    }
});

app.get('/profile-add', async(req:express.Request, res:express.Response) => {
    try {
        if(req.cookies.token === undefined) 
            res.redirect('/auth');
        else {
            let informL:any = inform;
            inform = null;
            let result:any = await CheckAuth(req.cookies.token, 1);
            if(result == 0) 
                res.redirect('/auth');
            else res.render('profile_add', {
                    login: result.res[0].login, 
                    email: result.res[0].email, 
                    photo: result.res[0].photo,
                    inform: informL
                });
        }
    }catch(err:any) {
        res.redirect('/');
    }
});

app.get('/user', async(req:express.Request, res:express.Response) => {
    try {
        let result:any = await CheckAuth(req.cookies.token, 1);
        if(result == 0)
            res.redirect('/auth');
        else {
            if(req.query.type === undefined || req.query.id === undefined || req.query.type !== 'diary' && req.query.type !== 'story') 
                res.redirect('/profile');
            else {
                res.render('user', {
                    login: result.res[0].login, 
                    email: result.res[0].email, 
                    photo: result.res[0].photo,
                    result: await GetDiaryOrStoryForUser(req.query.type, req.query.id, result.res[0].id)
                });
            }
        }
    }catch(err:any) {
        res.status(520);
    }
});

// Post

app.post('/upload-img', async(req:express.Request, res:express.Response) => {
    try {
        upload(req, res, async function(err:any) {
            if(err) {
                inform = false;
                res.redirect('/profile-settings');
            }
            else {
                if(req.file!.mimetype == 'application/x-msdownload')
                    res.status(406);
                else {
                    let data:any = await CheckAuth(req.cookies.token, 1);
                    if(data == 0)
                        res.redirect('/auth');
                    else {
                        if(req.file!.mimetype == 'image/png' || req.file!.mimetype == 'image/jpg' || req.file!.mimetype == 'image/jpeg' || req.file!.mimetype == 'image/gif') {
                            UploadPhoto(req.file!.path, data.res[0].id);
                            setTimeout(() => {
                                res.redirect('/profile-settings');
                            }, 3000)
                        }
                        else
                            res.redirect('/upload-img');
                    }
                }
            }
        });
    }catch(err:any) {
        res.status(520);
    }
});

app.post('*/update-password', async(req:express.Request, res:express.Response) => {
    try {
        if(/[\u0400-\u04FF]/.test(`${req.query.newPass}`) === true)
            res.json({result: false, description: 'Cyrillic is present'});
        else if(req.query.newPass!.length! < 8 || req.query.newPass!.length! > 191)
            res.json({result: false, description: 'Less than 8 characters or more than 191 characters'});
        else if(req.query.newPass == req.query.oldPass)
            res.json({result: false, description: 'Passwords are the same'});
        else {
            let result:any = await CheckAuth(req.cookies.token, 1);
            if(result == 0)
                res.json({result: false, status: 401});
            else {
                let resultUP:any = await UpdPass(req.query.newPass, req.query.oldPass, result.res[0].id);
                if(resultUP == 1) {
                    let token:any = await GenerateToken();
                    await UpdToken(token, result.res[0].id);
                    await addCookie(res, token);
                    res.json({result: true});
                }
                else
                    res.json({result: false, description: 'Password mismatch'});
            }
        }
    }catch(err:any) {
        res.status(520);
    }
})

app.post('*/update-login', async(req:express.Request, res:express.Response) => {
    try {
        if(req.query.newLogin!.length! < 4 || req.query.newLogin!.length! > 191)
            res.json({result: false, description: 'Less than 4 characters or more than 191 characters'});
        else {
            let result:any = await CheckAuth(req.cookies.token, 1);
            if(result == 0)
                res.json({result: false, status: 401});
            else {
                if(req.query.newLogin == result.res[0].login)
                    res.json({result: false, description: 'Logins are the same'});
                else {
                    await UpdLogin(req.query.newLogin, result.res[0].id);
                    res.json({result: true});
                }
            }
        }
    }catch(err:any) {
        res.status(520);
    }
});

app.post('/add-diaryentry', urlencodedParser, async(req:express.Request, res:express.Response) => {
    try {
        let result:any = await CheckAuth(req.cookies.token, 1);
        if(result == 0)
            res.redirect('/auth');
        else {
            uploadManyPhoto(req, res, async function(err:any) {
                if(err) {
                    console.log(err);
                    inform = false;
                    res.redirect('/profile-add');
                }
                else if(req.body.Text.length < 8) {
                    inform = 'Little symbols or many symbols';
                    res.redirect('/profile-add');
                }
                else {
                    result = await AddDiaryEntry(req.body, result.res[0].id);
                    let file:any = req.files;
                    await AddVideoImage(file!.File, result[0]);
                    inform = true;
                    res.redirect('/profile-add');
                }
            });
        }
    }catch(err:any) {
        inform = false;
        res.redirect('/profile-add');
    }
});

app.post('/add-story', async(req:express.Request, res:express.Response) => {
    try {
        let result:any = await CheckAuth(req.cookies.token, 1);
        if(result == 0)
            res.redirect('/auth');
        else {
            upload(req, res, async function(err:any) {
                if(err) {
                    inform = false;
                    res.redirect('/profile-add');
                }
                else if(req.body.Text.length < 8 || req.body.Title.length < 8 || req.body.Title.length > 255) {
                    inform = 'Little symbols or many symbols';
                    res.redirect('/profile-add');
                } else if(/[0-9]/.test(req.body.Title) === true) {
                    inform = 'There is a latin or numbers';
                    res.redirect('/profile-add');
                }
                else {
                    let path:any = (req.file === undefined) ? null : req.file!.path;
                    await AddStory(path, req.body, result.res[0].id);
                    inform = true;
                    res.redirect('/profile-add');
                }
            });
        }
    }catch(err:any) {
        res.status(520);
    }
});

app.post('/add-quote', urlencodedParser, async(req:express.Request, res:express.Response) => {
    try {
        if(req.body.Text.length < 8 || req.body.Author.length < 4 || req.body.Author.length > 255) {
            inform = 'Little symbols or many symbols';
            res.redirect('/profile-add');
        }
        else if(/[0-9]/.test(req.body.Author) === true || /[0-9]/.test(req.body.Text) === true || /^[А-я\u00C0-\u00ff\s'\.,-\/#!$%\^&\*;:{}=\-_`~()]+$/.test(req.body.Text) === false || /^[А-я\u00C0-\u00ff\s'\.,-\/#!$%\^&\*;:{}=\-_`~()]+$/.test(req.body.Author) === false) {
            inform = 'There is a latin or numbers';
            res.redirect('/profile-add');
        }else {
            let result:any = await CheckAuth(req.cookies.token, 1);
            if(result == 0)
                res.redirect('/auth');
            else {
                await AddQuote(req.body, result.res[0].id);
                inform = true;
                res.redirect('/profile-add');
            }
        }
    }catch(err:any) {
        res.status(520);
    }
});

// PORT

listen();