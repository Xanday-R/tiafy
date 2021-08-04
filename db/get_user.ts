import { db } from './connection';

let knex:any = db();

export async function GetUser(id:any, iduser?:any) {
    let result:any = [0, 0];
    result[0] = await knex('accounts').select('*').where({id: id});
    if(iduser !== undefined) {
        result[1] = await knex('likes').select('*').where({user: iduser});
        return result;
    }else
        return result;
}