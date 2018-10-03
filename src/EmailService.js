const nodemailer = require("nodemailer");
const mailgunTransport = require("nodemailer-mailgun-transport");
const validator = require("validator");

class EmailService {
  /**
   * @param gmailUsername  needs to be a fully qualified email address snoop@gmail.com for e.g.
   */
  constructor({ mailgunApiKey, mailgunDomain, gmailUsername, gmailPassword }) {
    if (mailgunApiKey) {
      const auth = {
        auth: {
          api_key: mailgunApiKey,
          domain: mailgunDomain
        },
        host: "api.eu.mailgun.net"
        // proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
      };

      this.transporter = nodemailer.createTransport(mailgunTransport(auth));
    }

    if (gmailUsername && gmailPassword) {
      const transportUri =
        "smtps://" + encodeURIComponent(gmailUsername) + ":" + encodeURIComponent(gmailPassword) + "@smtp.gmail.com";
      this.transporter = nodemailer.createTransport(transportUri);
    }
  }

  sendEmail({ fromAddress, toAddress, subject, text, htmlText }, callback) {
    const isEmail = validator.isEmail(toAddress);
    if (!isEmail) {
      callback(new Error("Provided email " + toAddress + " is not valid!"), null);
      return;
    }

    const mailOptions = {
      from: fromAddress ? fromAddress : "noreply@smalldata.tech",
      to: toAddress,
      subject: subject,
      text: text,
      html: htmlText
    };

    this.transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, info);
      // if you don't want to use this transport object anymore, uncomment following line
      // smtpTransport.close(); // shut down the connection pool, no more messages
    });
  }
}

module.exports = EmailService;
