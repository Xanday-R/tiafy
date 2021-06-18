import { db } from './connection';

let knex:any = db();

export async function CheckAuth(cookie?:string) {
    if(cookie === undefined) return 0;
    else {
        let res:any = await knex('accounts').select('*').where({'token': cookie});
        if(res.length == 0) return 0;
        let liked:any = await knex('likes').select('*').where({'user': res[0].id});
        return {
            res, 
            liked
        }; 
    } 
}