import { db } from './connection';

let knex:any = db();

export class GetAll {
    public id:number
    constructor(id:number) {
        this.id = id;
    }
    async GetQuote():Promise<any> {
        let result:any = await knex('quote').select('*').where({appendor: this.id});
        if(result == 0) return 0;
        return result;
    }
    async GetDiary():Promise<any> {
        let diary:any = await knex('diary').select('*').where({appendor: this.id});
        if(diary == 0) return 0;
        return diary
    }
    async GetStory():Promise<any> {
        let result:any = await knex('story').select('*').where({appendor: this.id});
        if(result == 0) return 0;
        return result;
    }
}