import { db } from './connection';

let knex:any = db();

export async function UpdToken(token:any, id:any) {
    await knex('accounts').update({token: token}).where({id: id});
}