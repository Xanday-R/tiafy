import { GetDate } from '../other/date';
import { db } from './connection';

let knex:any = db();

export async function AddDiaryEntry(data:any, id:number) {
    if(data.Date.length == 0) data.Date = GetDate();
    let result:any = await knex('diary').insert({date: data.Date, text: data.Text, user_id: id}, ['*']);
    return result;
}