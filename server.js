'use strict'
var express = require("express");
var jobModel = require("./models/Job");
var jobsData = require("./jobs-data.js");

var app = express();

//var urlDB = 'mongodb://kobfinder:kobfinder@ds039251.mongolab.com:39251/kobfinder';
var urlDB = 'mongodb://localhost/kobfinder';


require("./job-service.js")(jobsData, app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.render('index');
});

jobsData.connectDB(urlDB)
    .then(function() {
        console.log('connected to mongodb successfully!');
        jobsData.seedJobs();
    });

app.listen(process.env.PORT, process.env.IP);