'use strict'
var mongoose = require("mongoose");
var Promise = require("bluebird");

var Job = mongoose.model('Job');

var findJobs = function(query) {
    return Promise.cast(mongoose.model('Job').find(query).exec());
};
exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

var createJob = Promise.promisify(Job.create, Job);

exports.seedJobs = function() {
    return findJobs({}).then(function(collection) {
        if (collection.length == 0) {
            console.log('created records!');
            return Promise.map(jobs, function(job) {
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
