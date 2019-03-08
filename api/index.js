const express = require('express')
const app = express()
const db = require('./db');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/jobs', function (req, res) {
  // var userInput = [];
  var filter = req.body["filter"];
  if (filter) {
    if (filter.cityId)
      filter.cityId = filter.cityId.join(",");
    if (filter.categoryId)
      filter.categoryId = filter.categoryId.join(",");
    if (filter.sortBy.value) {
      filter.sortBy = "da_" + filter.sortBy.value + " " + filter.sortBy.direction;
    }
    else filter.sortBy = "";
  }
  // query to the database and get the data
  db.execProcedure('getJobs', filter).then(data => {
    res.send(data)
  },
    error => console.log(error)
  )
});

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}