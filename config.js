var mailer = require('nodemailer');

const configSetting = {
  db_Name:"casebuilder",
  db_Path: "mongodb://mst2019b2.eastus.cloudapp.azure.com:17008/casebuilder?retryWrites=true",
  portNo: '8080',
  hostName: 'localhost',
  serverName: 'localhost',
};

const transporter = mailer.createTransport({
  host: 'mail.rentblazr.com',
  port: 25,
  secure: false,
  auth: { user: 'admin@rentblazr.com', pass: 'mstech05' }
});

module.exports = {
  ConfigSetting: configSetting,
  EmailTransporter: transporter
};