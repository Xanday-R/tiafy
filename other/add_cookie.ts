import cookieParser from "cookie-parser";

export async function addCookie(res:any, token:string) {
    res.cookie('token', token)
}