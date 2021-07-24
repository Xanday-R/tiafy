import { db } from './connection';

let knex:any = db();

export async function UpdLogin(login:any, id:any) {
    await knex('accounts').update({login: login}).where({id: id});
}