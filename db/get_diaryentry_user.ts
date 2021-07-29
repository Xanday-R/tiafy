import { db } from './connection';

let knex:any = db();

export async function GetDiaryUser(id:any) {
    let diary:any = await knex('diary').select('*').where({user_id: id});
    if(diary == 0) return 0;
    let video_photo:any = [];
    for(let i in diary) {
        video_photo.push(await knex('video&photo').select('*').where({id_diaryentry: diary[i].id}));
    }
    return {
        diary,
        video_photo
    };
}