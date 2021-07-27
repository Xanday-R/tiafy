import { db } from './connection';
const imgur = require('imgur')

let knex:any = db();

export async function AddVideoImage(file:any, id:any) {
    for(let i in file) {
        let url:any = await imgur.uploadFile(file[i]!.path)
        await knex('video&photo').insert({type: file[i]!.mimetype, url: url.link, id_diaryentry: id});
    }
}