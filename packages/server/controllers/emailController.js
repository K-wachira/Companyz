const nodemailer = require("nodemailer");
const pool = require("../db");


let tempTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports.sendNotificationEMail = async (req, res) => {

  let details = {
    from: process.env.EMAIL_ACCOUNT,
    to: req.email,
    subject: req.subject,
    text: req.text,
  };

  tempTransport.sendMail(details, (err) => {
    if (err) {
      console.log("There was an error sending the message", err);
      return res.json({ error: err });
    } else {
      console.log("Message was sent successfully");
      return res.json({status: "Email Sent"});
    }
  });
};


module.exports.sendResetEMail = async (req, res) => {

  let details = {
    from: process.env.EMAIL_ACCOUNT,
    to: req.email,
    subject: req.subject,
    text: req.text,
  };

  tempTransport.sendMail(details, (err) => {
    if (err) {
      console.log("There was an error sending the message", err);
      return res.json({ error: err });
    } else {
      console.log("Message was sent successfully");
      return res.json({status: "Email Sent"});
    }
  });
};
