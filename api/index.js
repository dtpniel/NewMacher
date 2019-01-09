const express = require('express')
const app = express()
const db = require('./db');



app.get('/jobs', function (req, res) {

  // query to the database and get the data
  db.execProcedure('getJobs', null, function (err, recordset) {

    if (err)
      console.log(err)

    // send data as a response
    res.send(recordset);
  });
});



// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}