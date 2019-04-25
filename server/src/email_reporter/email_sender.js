let credentials = require('./credentials')
let nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport(credentials.email_credentials);

module.exports = {
    send_email: async function(subject, text) {
        return new Promise(function(resolve, reject) {
            var mail = {
                from: credentials.email_credentials.auth.user,
                to: credentials.recepient,
                subject: subject,
                text: text
            };

            transporter.sendMail(mail, function(error, info) {
                if(error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            })
        })
    }
}