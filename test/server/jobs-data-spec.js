'use strict'
var expect = require("chai").expect;
var mongoose = require("mongoose");
var Promise = require("bluebird");
var jobModel = require("../../models/Job");
var jobsData = require("../../jobs-data.js");

//var urlDB = 'mongodb://kobfinder:kobfinder@ds039251.mongolab.com:39251/kobfinder';
var urlDB = 'mongodb://localhost/kobfinder';

function resetJobs() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe("jobs-data-spec: get jobs", function() {

    var jobs;

    before(function(done) {
        jobsData.connectDB(urlDB)
            .then(resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function setJobs(collection) {
                jobs = collection;
                done();
            });
    });

    after(function() {
        mongoose.connection.close();
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

describe("jobs-data-spec: db save jobs", function() {

    var job = {
        title: 'Cook',
        description: 'You will be manking bagels'
    };
    var jobs;

    function saveTestJobs() {
        return jobsData.saveJob(job);
    }

    before(function(done) {
        jobsData.connectDB(urlDB)
            .then(resetJobs)
            .then(function() {
                return jobsData.saveJob(job);
            })
            .then(jobsData.findJobs)
            .then(function setJobs(collection) {
                //console.log(JSON.stringify(collection));
                jobs = collection;
                done();
            });
    });

    after(function() {
        mongoose.connection.close();
    });

    it("should have one job after saving one job", function() {
        expect(jobs).to.have.length(1);
    });

});