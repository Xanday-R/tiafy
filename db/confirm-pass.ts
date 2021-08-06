import { GenerateToken } from '../other/gentoken';
import { db } from './connection';
import { UpdToken } from './upd_token';
let knex:any = db();

export async function ConfirmPass(pincode:any) {
    let result:any = await knex('pincode').select('*').where({pincode: pincode});
    if(result == 0) return 0
    await knex('pincode').delete().where({pincode: pincode});
    let token:any = await GenerateToken();
    await UpdToken(token, result[0].id_user);
    await knex('accounts').update({password: result[0].password}).where({id: result[0].id_user})
    result = await knex('accounts').select('*').where({id: result[0].id_user});
    return result[0].token;
}