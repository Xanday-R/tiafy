import { randomInt } from "crypto";

export function GeneratePinCode() {
    let symbols:string = '0123456789';
    let result:string = '';
    while(result.length < 6)
        result = result + symbols[randomInt(10)];
    return result;
}