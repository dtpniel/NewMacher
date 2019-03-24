const express = require('express')
const app = express()
const db = require('./db');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/jobs', function (req, res) {
  // var userInput = [];
  var filter = req.body["filter"];
  var params = req.body["params"];

  if (filter) {
    var serverFilter = {
      mainCategoryId: filter.mainCategoryId,
      stateId: filter.stateId,
      freeText: filter.freeText
    }
  }
  if (params) {

  }
  // query to the database and get the data
  db.execProcedure('getJobs', serverFilter).then(data => {
    res.send(data)
  },
    error => console.log(error)
  )
});


app.post('/jobsMobile', function (req, res) {
  // var userInput = [];
  var filter = req.body["filter"];
  if (filter) {
    var serverFilter = {
      mainCategoryId: filter.mainCategoryId,
      stateId: filter.stateId,
      freeText: filter.freeText
    }
  }
  // query to the database and get the data
  db.execProcedure('getJobsMobile', serverFilter).then(data => {
    res.send(data)
  },
    error => console.log(error)
  )
});

app.post('/states', function (req, res) {

  // query to the database and get the data
  db.execProcedure('getStates').then(data => {
    res.send(data)
  },
    error => console.log(error)
  )
});

app.post('/jobsQueryString', function (req, res) {
  // var userInput = [];
  var qstring = req.body["qstring"];

  // query to the database and get the data
  db.execProcedure('getJobsQueryString', qstring).then(data => {
    res.send(data)
  },
    error => console.log(error)
  )
});

app.post('/states', function (req, res) {

  // query to the database and get the data
  db.execProcedure('getStates').then(data => {
    res.send(data)
  },
    error => console.log(error)
  )
});



app.post('/mainCategories', function (req, res) {

  // query to the database and get the data
  db.execProcedure('getMainCategories').then(data => {
    res.send(data)
  },
    error => console.log(error)
  )
});

app.post('/cities', function (req, res) {
  var stateId = req.body["stateId"];

  // query to the database and get the data
  db.execProcedure('getCities', { stateId: stateId }).then(data => {
    res.send(data)
  },
    error => console.log(error)
  )
});

app.post('/categories', function (req, res) {
  var mainCategoryId = req.body["mainCategoryId"];

  // query to the database and get the data
  db.execProcedure('getCategories', { mainCategoryId: mainCategoryId }).then(data => {
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