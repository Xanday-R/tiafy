import { db } from './connection';
const imgur = require('imgur')

let knex:any = db();

export async function AddStory(path:string, data:any, id:number) {
    let url:any = await imgur.uploadFile(path)
    console.log(1);
    let date:any = new Date();
    console.log(1);
    date = [date.getFullYear(), date.getMonth() + 1, date.getDate() + 1];
    console.log(1);
    if(date[1] < 9)
        date[1] = '0' + date[1]
    if(date[2] < 9)
        date[2] = '0' + date[2]
    console.log(1);
    date = `${date[0]}-${date[1]}-${date[2]}`;
    await knex('story').insert({name: data.Title, text: data.Text, appendor: id, img: url.link, time: date});
}