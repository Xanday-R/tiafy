import { db } from './connection';

let knex:any = db();

export async function GetStoryUser(id:any) {
    let result:any = await knex('story').select('*').where({appendor: id});
    if(result == 0) return 0;
    return result;
}