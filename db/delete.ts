import { db } from './connection';

let knex:any = db();

export async function DeleteData(type:any, id:any, user:number) {
    let result:any = await knex(type).delete().where({id: id, appendor: user});
    return result
}