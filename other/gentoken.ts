import { randomInt } from "crypto";

export async function GenerateToken() {
    let symbols:string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    while(result.length < 255)
        result = result + symbols[randomInt(62)];
    return result;
}