import { Message } from "emailjs";
import { client } from "./outlook";

export async function SendMessageRegister(email:string, pincode:string) {
    const message = new Message({
        from: 'tiafy_official@outlook.com',
        to: `${email}`,
        subject: 'Tiafy - Регистрация аккаунта',
        text: `Ссылка для подтверждения регистрации: http://localhost:3000/confirm-registration?pincode=${pincode}. Не давайте её никому`
    });

    await client.send(message);
}