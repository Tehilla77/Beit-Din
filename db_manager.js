const mysql = require('mysql2');

const config = require('./config/config')

const pool = mysql.createPool({
  host: config.db_host,
  user: 'root',
  port:config.db_port,
   password :config.db_password,
  database : 'beis_din_db'
}).promise();

module.exports = pool;

