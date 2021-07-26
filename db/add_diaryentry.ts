import { db } from './connection';

let knex:any = db();

export async function AddDiaryEntry(data:any, id:any) {
    let result:any = await knex('diary').insert({date: data.Date, text: data.Text, user_id: id}, ['*']);
    return result;
}