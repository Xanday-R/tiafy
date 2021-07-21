import { db } from './connection';

let knex:any = db();

export async function UpdPass(pass:any, oldPass:any, id:any) {
    let result:any = await knex('accounts').update({password: pass}).where({id: id, password: oldPass});
    return result;
}