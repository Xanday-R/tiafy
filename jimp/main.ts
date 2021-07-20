import Jimp from "jimp";
import { UpdImg } from "../db/upd_img";
const imgur = require('imgur')

export async function UploadPhoto(img:any, id:any) {
   Jimp.read(img)
      .then(read => {;
         read.resize(176, 176)
         read.write(img);
      });
   setTimeout(() => {
      imgur.uploadFile(img)
         .then(function (json:any) {
            UpdImg(json.link, id)
         })
   }, 500);
   return 0;
}