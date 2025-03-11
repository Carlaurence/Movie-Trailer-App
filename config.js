const dotenv = require('dotenv').config();
const config = {
  appConfig: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
  db_postgresqlConfig: {
    user: process.env.POSTGRESQL_USER,
    host: process.env.POSTGRESQL_HOST,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_NAME,
    port: process.env.POSTGRESQL_PORT,
    uri: process.env.PG_URI,
  },
  db_mongodbConfig: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    name: process.env.MONGODB_NAME,
  },
  secretConfig: {
    word: process.env.SECRET,
  },
};
module.exports = config;
