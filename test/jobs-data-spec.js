'use strict'
var expect = require("chai").expect;
var mongoose = require("mongoose");
var jobModel = require("../models/Job");
var Promise = require("bluebird");
var jobsData = require("../jobs-data.js");

function resetJobs() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe("get jobs", function() {

    var jobs;
    var urlDB = 'mongodb://kobfinder:kobfinder@ds039251.mongolab.com:39251/kobfinder';
    //var urlDB = 'mongodb://localhost/kobfinder';

    before(function(done) {
        jobsData.connectDB(urlDB)
            .then(resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function(collection) {
                //console.log(JSON.stringify(collection));
                jobs = collection;
                done();
            });
    });

    it("should never be empty since jobs are seeded", function() {
        expect(jobs.length).to.be.at.least(1);
    });
    it("should have a job with a title", function() {
        expect(jobs[0].title).to.not.be.empty;
    });
    it("should have a job with a description", function() {
        expect(jobs[0].description).to.not.be.empty;
    });
});
