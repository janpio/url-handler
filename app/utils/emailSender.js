// email.js

import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Define the email options
        const mailOptions = {
            from: "<Nexis LTD> nexisltd@gmail.com",
            to: to,
            subject: subject,
            text: text,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendEmail;
