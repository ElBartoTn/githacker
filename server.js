var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;


var PROFILES_COLLECTION = "profiles";
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
var url = 'mongodb://admin:admin@ds141175.mlab.com:41175/githacker'
// Connect to the database before starting the application server. 
mongodb.MongoClient.connect(url, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// PROFILE API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "error": message });
}

/* 
 *    GET: finds all profile order by score
 *    POST: creates a new profile
 */
app.get("/profile", function (req, res) {
  db.collection(PROFILES_COLLECTION).find().sort({ totalScore: -1 }).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get profile.");
    } else {
      res.status(200).json(docs);
    }
  });

});

app.post("/profile", function (req, res) {
  var newProfile = req.body;
  newProfile.username = req.body.username;
  newProfile.country=req.body.country;
  newProfile.starsNbr = req.body.starsNbr;
  newProfile.issuesNbr = req.body.issuesNbr;
  newProfile.forksNbr = req.body.forksNbr;
  newProfile.projectNbr = req.body.projectNbr;
  newProfile.totalScore = req.body.totalScore;
  
  



  db.collection(PROFILES_COLLECTION).insertOne(newProfile, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new profile.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});






/*  "/profile/:id"
 *    GET: find profile by id
 *    PUT: update profile by id
 *   
 */

app.get("/profile/:username", function(req, res) {
  db.collection(PROFILES_COLLECTION).findOne({ username: req.params.username }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get profile");
    } else {
      res.status(200).json(doc);  
    }
  });
});



