const oracledb = require('oracledb');
const { dbconfig } = require('./dbconfig');

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const executeQuery = async (sql, binds = [], options = {}) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    const resultQuery = await connection.execute(sql, binds, options);
    // console.log('Rows inserted: ' + resultQuery.rowsAffected);
    // console.log('ROWID of new row: ' + resultQuery.lastRowid);
    return resultQuery;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

module.exports = {
  executeQuery,
};
