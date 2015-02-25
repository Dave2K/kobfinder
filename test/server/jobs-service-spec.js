'use strict'
var express = require("express")
var expect = require("chai").expect;
var request = require("supertest");
var Promise = require("bluebird");
var jobsData = require("../../jobs-data.js");

var app = express();

var dataSavedJob;

var db = {
    findJobs: function() {
        return new Promise(function(resolve, reject) {
            console.log("job-service-spec.findJobs");
            jobsData.findJobs().then(function(collection) {
                console.log("job-service-spec.findJobs->collection: " + JSON.stringify(collection));
                resolve(collection);
            });
        });
    },
    saveJob: function(job) {
        dataSavedJob = job;
    }
};

var jobService = require("../../job-service")(db, app);

describe("jobs-service-spec: get jobs", function() {

    it("get should give me a json list of jobs", function(done) {
        request(app).get('/api/jobs')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                console.log(err)
                expect(res.body).to.be.a('Array');
                done();
            });
    });
});

describe("jobs-service-spec: save jobs", function() {
    it("should validate that title is greater than 4 characters");
    it("should validate that title is less than 40 characters");
    it("should validate that description is greater than 4 characters");
    it("should validate that description is less than 250 characters");

    var newJob = {
        title: 'Cook',
        description: 'You will be manking bagels'
    };

    it("should pass the job to the database save", function(done) {
        request(app).post('/api/jobs').send(newJob).end(function(err, res) {
            expect(dataSavedJob).to.deep.equal(newJob);
            done();
        });
    });
    it("should return a status of 200 to the front end if the database saved");
    it("should return a job with an id");
    it("should return an error if the database failed");

});