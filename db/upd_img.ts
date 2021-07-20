import { db } from './connection';

let knex:any = db();

export async function UpdImg(url:string, id:any) {
    let res:any = await knex('accounts').update({photo: url}).where({id: id});
}