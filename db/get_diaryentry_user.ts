import { db } from './connection';

let knex:any = db();

export async function GetDiaryUser(id:any, num?:number) {
    let diary:any = await knex('diary').select('*').where({user_id: id});
    if(diary == 0) return 0;
    if(num == 1) {
        let videophoto:any = [];
        for(let i in diary) {
            videophoto.push(await knex('video&photo').select('*').where({id_diaryentry: diary[i].id}));
        }
        return {
            diary,
            videophoto
        };
    }
    return diary
    
}