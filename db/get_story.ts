import { db } from './connection';

let knex:any = db();

export async function GetStory(id:any) {
    let result:any = await knex('story').select('*').where({id});
    if(result == 0) return 0;
    result[0].appendor = [result[0].appendor, await knex('accounts').select('login').where({id: result[0].appendor})];
    return {
        name: result[0].name, 
        text: result[0].text, 
        appendor: result[0].appendor[1], 
        idappendor: result[0].appendor[0],
        img: result[0].img, 
        likes: result[0].likes, 
        time: result[0].time,
        id: result[0].id
    };
}