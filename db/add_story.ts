import { GetDate } from '../other/date';
import { db } from './connection';

const imgur = require('imgur');

let knex:any = db();

export async function AddStory(path:string, data:any, id:number) {
    let date:any = GetDate();
    let url:any;
    if(path === null) 
        await knex('story').insert({name: data.Title, text: data.Text, appendor: id, date: date})
    else {
        url = await imgur.uploadFile(path)
        await knex('story').insert({name: data.Title, text: data.Text, appendor: id, img: url.link, date: date});
    }
}