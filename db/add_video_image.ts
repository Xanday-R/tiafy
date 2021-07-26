import { db } from './connection';
const imgur = require('imgur')

let knex:any = db();

export async function AddVideoImage(file:any, id:any) {
    for(let i in file) {
        let url:any = await imgur.uploadFile(file[i]!.path)
        await knex('video&photo').insert({type: file[i]!.mimetype, url: url.link, id_diaryentry: id});
        // if(file[i]!.mimetype == 'image/jpeg' || file[i]!.mimetype == 'image/jpg' || file[i]!.mimetype == 'image/png' || file[i]!.mimetype == 'image/gif' || file[i]!.mimetype == 'video/mp4' || file[i]!.mimetype == 'video/avi' || file[i]!.mimetype == 'video/webm' || file[i]!.mimetype == 'image/tiff') {
        //     let url:any = await imgur.uploadFile(file[i]!.path)
        //     await knex('video&photo').insert({type: file[i]!.mimetype, url: url.link, id_diaryentry: id});
        // }
    }
}