import { db } from './connection';

let knex:any = db();

export async function LogIn(email:string, password:string) {
    let result:any = await knex('accounts').select('*').where({email: email, password: password});
    if(result == 0) return 0
    return result;
}