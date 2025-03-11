// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: db_postgresqlConfig.uri,
// });
// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   },
// };
const pg = require('pg');
const { db_postgresqlConfig } = require('../../../config');
const pool = new pg.Pool({
  user: db_postgresqlConfig.user,
  host: db_postgresqlConfig.host,
  password: db_postgresqlConfig.password,
  database: db_postgresqlConfig.database,
  port: db_postgresqlConfig.port,
});
module.exports = pool;
