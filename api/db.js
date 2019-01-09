
//var env = process.env.NODE_ENV || 'development';
//var config = require('./settings')[env];
var config = require('./settings');
const sql = require('mssql');

exports.execSql = async function (sqlquery, userInput = {}) {
  const pool = new sql.ConnectionPool(config.database);
  pool.on('error', err => {
    // ... error handler 
    console.log('sql pool error db.js', err);
  });

  try {
    await pool.connect();
    let result = await pool.request();
    for (let key in userInput) {
      if (Array.isArray(userInput[key])) {
        // input(field_name, dataType, value)
        result = await result.input(key, userInput[key][1], userInput[key][0]);
      } else {
        // input(field_name, value)
        result = await result.input(key, userInput[key]);
      };
    };
    result = await result.query(sqlquery);

    return { data: result };
  } catch (err) {
    // stringify err to easily grab just the message
    let e = JSON.stringify(err, ["message", "arguments", "type", "name"]);
    return { error: JSON.parse(e).message };
  } finally {
    pool.close(); //closing connection after request is finished.
  }
};


exports.execProcedure = async function (procedure, userInput = {}) {
  const pool = new sql.ConnectionPool(config.database);
  pool.on('error', err => {
    // ... error handler 
    console.log('sql pool error db.js', err);
  });

  try {
    await pool.connect();
    let result = await pool.request();
    for (let key in userInput) {
      if (Array.isArray(userInput[key])) {
        // input(field_name, dataType, value)
        result = await result.input(key, userInput[key][1], userInput[key][0]);
      } else {
        // input(field_name, value)
        result = await result.input(key, userInput[key]);
      };
    };
    result = await result.execute(procedure);

    return { data: result };
  }
  catch (err) {
    // stringify err to easily grab just the message
    let e = JSON.stringify(err, ["message", "arguments", "type", "name"]);
    return { error: JSON.parse(e).message };
  }
  finally {
    pool.close(); //closing connection after request is finished.
  }
};