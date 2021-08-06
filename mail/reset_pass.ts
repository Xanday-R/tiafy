import { Message } from "emailjs";
import { client } from "./outlook";

export async function SendMessage(email:string, pincode:string) {
    const message = new Message({
        from: 'tiafy_official@outlook.com',
        to: `${email}`,
        subject: 'Tiafy - Восстановление пароля',
        text: `Ссылка для восстановления пароля: http://localhost:3000/confirm-pass?pincode=${pincode}. Не давайте её никому`
    });

    await client.send(message);
}