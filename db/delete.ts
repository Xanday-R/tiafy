import { db } from './connection';

let knex:any = db();

export async function DeleteData(type:any, id:any, user:number) {
    let result:any = await knex(type).delete().where({id: id, appendor: user});
    if(type != 'diary') 
        await knex('likes').delete().where({idrecords: id, type: type});
    else
        await knex('video&photo').delete().where({id_diaryentry: id});
    return result
}