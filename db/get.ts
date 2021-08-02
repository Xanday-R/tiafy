import { db } from './connection';

let knex:any = db();

export async function GetDiaryOrStory(type:string) {
    let result:any = [0, []];
    result[0] = await knex(type).select('*');
    let account:any = await knex('accounts').select('*');
    for(let i in account)
        for(let ii in result[0])
            if(account[i].id == result[0][ii].appendor)
                result[1].push(account[i].login)
    return result
}