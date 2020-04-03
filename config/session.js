const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const storeConfig = {
  host:'localhost',
  port: 3306,
  user:'root',
  database:'demo-sgroup',
  password:'',
  clearExpired: true,
  checkExpirationInterval: 1000,
  expiration:1000*60*60*24,
};

const sessionStore = new MySQLStore(storeConfig);
const sessionConfig = {
  key: 'na',
  secret: 'nana',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    //  Cookie.secure is only available in HTTPS only ( express-session doc )
    // secure: true,
    // The age of the cookie that is sent to client-side
    maxAge: 1000*60*60*24,
  },
};
const sessionModules = session(sessionConfig);
module.exports = {
  sessionModules,
};
