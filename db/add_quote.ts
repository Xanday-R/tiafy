import { GetDate } from '../other/date';
import { db } from './connection';

let knex:any = db();

export async function AddQuote(data:any, id:number) {
    let date:any = GetDate();
    await knex('quote').insert({text: data.Text, author: data.Author, appendor: id, date: date});
}