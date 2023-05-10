import nodemailer from "nodemailer";

const sendEmail = async (to, subject, url) => {
    try {
        const AWS = await import("aws-sdk");

        AWS.config.update({
            accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
            region: process.env.AWS_SES_REGION_NAME,
        });

        const ses = new AWS.SES({ apiVersion: "2010-12-01" });
        const transporter = nodemailer.createTransport({
            SES: ses,
        });

        const mailOptions = {
            from: "info@nexisltd.com",
            to,
            subject,
            html: `
        <html>
          <head>
            <style>
              /* Define your CSS styles here */
              body {
                font-family: Arial, sans-serif;
                color: #333333;
              }
              .container {
                padding: 20px;
                background-color: #f4f4f4;
              }
              .heading {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
              }
              .message {
                font-size: 16px;
                margin-bottom: 20px;
              }
              .url {
                font-size: 18px;
                color: #0066cc;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="heading">You have shortened a new URL</div>
              <div class="message">Congratulations! You have successfully shortened a URL. Here's the shortened URL:</div>
              <div class="url">${url}</div>
            </div>
          </body>
        </html>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendEmail;
