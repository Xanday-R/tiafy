import { SendMessageReset } from '../mail/reset_pass';
import { GeneratePinCode } from '../other/genpincode';
import { db } from './connection';

let knex:any = db();

export async function RestorePass(email:string, password:string) {
    let result:any = await knex('accounts').select('*').where({email: email});
    if(result == 0) return 0
    let check:any = await knex('pincode').select('*').where({id_user: result[0].id});
    if(check != 0) return 1;
    let pincode:any = GeneratePinCode();
    await knex('pincode').insert({id_user: result[0].id, pincode: pincode, password: password});
    result = await SendMessageReset(email, pincode);
    return 2;
}