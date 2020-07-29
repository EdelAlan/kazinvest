'use strict';
const mail = require('sendmail')();

module.exports = async (
  to,
  subject,
  body
) => {
  return mail({
    from: "interactivemap@invest.gov.kz", // sender address
    to: to,
    subject: subject,
    text: body
  }, (err, reply) => {
    console.log(err && err.stack);
    console.log(reply);
  });
}