'use strict'
var mongoose = require("mongoose");
var Promise = require("bluebird");
var jobModel = require("./models/Job");

var Job = jobModel.model;

var findJobs = function(query) {
    console.log("jobs-data.findjobs");
    return Promise.cast(mongoose.model('Job').find(query).exec());
};

var createJob = Promise.promisify(Job.create, Job);
//var createJob = function(newJob) {
//    console.log("jobs-data.createJob");
//    return Promise.cast(mongoose.model('Job').insert(newJob).exec());
//};

//
// exports
//
exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

exports.saveJob = createJob;

exports.seedJobs = function() {
    return findJobs({}).then(function(collection) {
        //console.log('collection: ' + JSON.stringify(collection));
        if (collection.length == 0) {
            console.log('start created records!');
            return Promise.map(jobs, function(job) {
                console.log('created record!');
                return createJob(job);
            });
        }
    });
}

var jobs = [{
    title: 'Cook',
    description: 'You will be manking bagels'
}, {
    title: 'Waiter',
    description: 'You will putting food on peoples tab'
}, {
    title: 'Programmer',
    description: 'You will be mindlessly typing for h'
}, {
    title: 'Axe Maker',
    description: 'We need many axes made.. so many.. '
}];
