import { transporter } from "../configs/nodemailer.configs.js";

const sentEmail = async (receiverEmail, subject, message) => {
    if (!receiverEmail) throw new Error("Receiver email is required");
    if (!message) throw new Error("Message is required");
    try {
        const info = await transporter.sendMail({
            from: `"My app name 👻" <${process.env.MY_EMAIL_ADDRESS}>`,
            to: `${receiverEmail}`,
            subject: `${subject}`,
            html: `${message}`,
        });
    } catch (err) {
        throw new Error(`${err.message}`);
    }
};

export { sentEmail };