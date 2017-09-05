'use strict';

const nodemailer = require('nodemailer');
const validator = require('validator');

class EmailService {
  /**
   * @param username  needs to be a fully qualified email address snoop@gmail.com for e.g.
   * @param password  required
   */
  constructor(username, password) {
    let transportUri = 'smtps://' + encodeURIComponent(username) + ':' + encodeURIComponent(password) + '@smtp.gmail.com';
    this.transporter = nodemailer.createTransport(transportUri);
  }

  sendEmail(toAddress, subject, text, htmlText, callback) {

    let isEmail = validator.isEmail(toAddress);
    if (!isEmail) {
      callback(new Error('Provided email ' + toAddress + ' is not valid!'), null);
      return;
    }

    let mailOptions = {
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

};

module.exports = EmailService;
