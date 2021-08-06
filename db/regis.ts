import { SendMessage } from '../mail/register';
import { GeneratePinCode } from '../other/genpincode';
import { db } from './connection';

let knex:any = db();

export async function Registration(email:string, login:string, password:string) {
    let result:any = await knex('accounts').select('*').where({email: email});
    if(result != 0) return 0;
    result = await knex('pincode').select('*').where({email: email});
    if(result != 0) return 0
    let pincode:any = GeneratePinCode();
    await knex('pincode').insert({login: login, email: email, pincode: pincode, password: password});
    result = await SendMessage(email, pincode);
    return 1;
}