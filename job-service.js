'use strict'
var bodyParser = require("body-parser");

module.exports = function(db, app) {
    app.use(bodyParser.json());

    app.get('/api/jobs', function(req, res) {
        console.log("job-service.get->db: " + db);
        db.findJobs().then(function(collection) {
            console.log("job-service.get->collection" + JSON.stringify(collection));
            res.send(collection);
        });
    });

    app.post('/api/jobs', function(req, res) {
        console.log("job-service.post->req.body: " + JSON.stringify(req.body));
        db.saveJob(req.body);
        res.end();
    });
}