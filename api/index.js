const express = require('express')
const app = express()
const db = require('./db');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/jobs', function (req, res) {
  // var userInput = [];
  var filter = req.body["filter"];

  // query to the database and get the data
  db.execProcedure('getJobs', filter).then(data => {
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