/* eslint-disable no-console */
const mailer = require("nodemailer");

require("dotenv").config();

export default async function main(req, res) {
  const transporter = mailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_SERVER,
      pass: process.env.PASSWORD,
    },
    secure: true,
  });

  const mailData = {
    from: "demo email",
    to: process.env.EMAIL_CLIENT,
    subject: `Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
  res.status(200);
}
