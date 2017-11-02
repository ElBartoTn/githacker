var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var github = require("octonode");
var PROFILES_COLLECTION = "profiles";
var request = require('request');
var isEmpty = require('lodash.isempty');
var qs = require('qs');

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
 *   GITHUB Oauth
 *    
 */
app.post('/auth/github', function(req, res) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var params = {
      code: req.body.code,
      client_id: "0072677d119c0d0e83eb",
      client_secret: "4f4a0309b52c5a04cdcd5cf903fbcbca99081063",
      redirect_uri: req.body.redirectUri
  };
  // Exchange authorization code for access token.
  request.post({
      url: accessTokenUrl,
      qs: params
  }, function(err, response, token) {
    console.log(qs.parse(token).access_token);
    
      var access_token = qs.parse(token).access_token;
      
      var github_client = github.client(access_token);
      // Retrieve profile information about the current user.
      github_client.me().info(function(err, profile) {
          if (err) {
              return res.status(400).send({
                  message: 'User not found'
              });
          }
          var github_id = profile['login'];
          db.collection(PROFILES_COLLECTION).findOne({
              username: github_id
          }, function(err, docs) {
              // The user doesn't have an account already
              if (docs==null) {
                
                  // Create the user
                  var user = {
                      username: github_id,
                      oauth_token: access_token
                  }
                  db.collection(PROFILES_COLLECTION).insertOne(user);
                  console.log(github_id  + 'inserted');
                  
              }
              // Update the OAuth2 token
              else {
                  db.collection(PROFILES_COLLECTION).update({
                      username: github_id
                      
                  }, {
                      $set: {
                          oauth_token: access_token
                      }
                      
                  })
                  console.log(github_id  + 'updated');
                  
              }
          });
      });
      res.send({
          token: access_token
      });
  });
});



/* 
 *    GET: finds all profile order by score
 *    POST: creates a new profile
 */
app.get("/profiles", function (req, res) {
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
  newProfile.country = req.body.country;
  newProfile.starsNbr = req.body.starsNbr;
  newProfile.issuesNbr = req.body.issuesNbr;
  newProfile.forksNbr = req.body.forksNbr;
  newProfile.projectNbr = req.body.projectNbr;
  newProfile.totalScore = req.body.totalScore;
  newProfile.technologie = req.body.technologie;



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

app.get("/profiles/:username", function (req, res) {
  db.collection(PROFILES_COLLECTION).findOne({ username: req.params.username },function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get profile.");
    } else {
      res.status(200).json(docs);
    }
  });

});


app.get("/profile/count/:country", function (req, res) {
  db.collection(PROFILES_COLLECTION).find({ country: req.params.country }).sort({ totalScore: -1 }).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get profile.");
    } else {
      res.status(200).json(docs);
    }
  });

});

app.get("/profile/tech/:technologie", function (req, res) {
  db.collection(PROFILES_COLLECTION).find({ technologie: req.params.technologie }).sort({ totalScore: -1 }).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get profile.");
    } else {
      res.status(200).json(docs);
    }
  });

});





