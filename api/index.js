const express = require('express')
const app = express()
const db = require('./db');



app.get('/jobs', function (req, res) {

  // query to the database and get the data
  db.execProcedure('getJobs').then(data => {
    res.send(data.data.recordsets)
  },
    error => console.log(error)
  )
});



// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}