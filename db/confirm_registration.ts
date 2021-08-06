import { GenerateToken } from '../other/gentoken';
import { db } from './connection';
let knex:any = db();

export async function ConfirmRegistration(pincode:any) {
    let result:any = await knex('pincode').select('*').where({pincode: pincode});
    if(result == 0) return 0
    await knex('pincode').delete().where({pincode: pincode});
    let token:any = await GenerateToken();
    await knex('accounts').insert({token: token, login: result[0].login, password: result[0].password, email: result[0].email, photo: 'img/user.png'});
    return token;
}