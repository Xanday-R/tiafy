import { db } from './connection';

let knex:any = db();

export async function GetDiaryOrStoryForUser(type:string, id:any, id_user:number) {
    let result:any = await knex(type).select('*').where({id: id, appendor: id_user});
    if(result == 0) return 0;
    return result
}