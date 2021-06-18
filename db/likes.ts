import { db } from './connection';

let knex:any = db();

export async function AddRemLike(id_user:any, liked:any, id_QorS:any, type:string) {
    for(let i in liked)
        if(liked[i].idrecords == id_QorS && liked[i].user == id_user && liked[i].type == type) {
            await knex('likes').delete().where({'idrecords': id_QorS, 'user': id_user, 'type': type});
            let likes:any = await knex(type).select('likes').where({'id': id_QorS});
            await knex(type).update({likes: likes[0].likes - 1}).where({'id': id_QorS});
            return {
                result: true, 
                auth: true
            };
        }
    await knex('likes').insert({'idrecords': id_QorS, 'user': id_user, 'type': type});
    let likes:any = await knex(type).select('likes').where({'id': id_QorS});
    await knex(type).update({likes: likes[0].likes + 1}).where({'id': id_QorS});
    return {
        result: true, 
        auth: true
    };
}