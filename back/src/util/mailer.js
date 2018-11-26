'use strict';
const email = require('email');

module.exports = async (
    to,
    subject,
    body
) => {

    var Email = email.Email;
    email.from = 'interactivemap@invest.gov.kz'
    var mail = new Email({
      to: to,
      subject: subject,
      body: body
    });
    return mail.send();
}