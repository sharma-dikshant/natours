const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //? 1) CREATE A TRANSPORTER

  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: process.env.EMAIL_USERNAME,
  //       pass: process.env.EMAIL_PASSWORD,
  //     },
  //     // Activate in gmail "less secure app" option
  //   });

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //? 2) DEFINE THE EMAIL OPTIONS
  const mailOptions = {
    from: 'Dikshant Sharma <dikshant@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //? 3) ACTUALLY SEND THE EMAIL
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
