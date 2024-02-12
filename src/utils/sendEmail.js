import nodemailer from "nodemailer";
import { config } from "dotenv";

config()

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        ...options
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
        }
        else {
            console.log("Email sent: " + info.response)
        }
    })
}

export default sendEmail