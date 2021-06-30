import { db } from './connection';

let knex:any = db();

export async function CheckAuth(cookie:string, num:number) {
    if(cookie === undefined) return 0;
    else {
        if(num == 2) {
            let res:any = await knex('accounts').select('*').where({'token': cookie});
            if(res.length == 0) return 0;
            let liked:any = await knex('likes').select('*').where({'user': res[0].id});
            return {
                res, 
                liked
            }; 
        } else {
            let res:any = await knex('accounts').select('*').where({'token': cookie});
            if(res.length == 0) return 0;
            return {res};     
        }
    } 
}