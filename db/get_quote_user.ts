import { db } from './connection';

let knex:any = db();

export async function GetQuoteUser(id:any) {
    let result:any = await knex('quote').select('*').where({appendor: id});
    if(result == 0) return 0;
    return result;
}