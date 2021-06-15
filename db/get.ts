import { db } from './connection';

let knex:any = db();

export async function Get(){
    let data:any = [0, 0];
    let accounts:any = await knex('accounts').select('id', 'login');
    data[0] = await knex('quote').select('*');
    data[1] = await knex('story').select('*');
    let array:any = [[], []];
    for(let i in array) {
        for(let a in data[i]) {
            for(let b in accounts) {
                if(data[i][a].appendor == accounts[b].id) {
                    array[i].push(accounts[b].login);
                    continue;
                }
            }
        }
    }
    return {quote: [data[0], array[0]], story: [data[1], array[1]]};
}