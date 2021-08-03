import { db } from './connection';

let knex:any = db();

export async function GetDiaryOrStoryForUser(type:string, id:any, id_user:number) {
    let result:any = [0, 0]
    result[0] = await knex(type).select('*').where({id: id, appendor: id_user});
    if(result[0] == 0) return 0;
    if(type == 'diary') {
        result[1] = await knex('video&photo').select('*').where({id_diaryentry: result[0][0].id});
        return result;
    }
    return result[0]
}