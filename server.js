// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var users = [
  {
    "id": 1,
    "userName": "lundstrom",
    "firstName": "Jeremy",
    "lastName": "Lundstrom",
    "walletAddress": "0x0e9b86F67E32898A6080D595616486FeFb0b46BD",
    "unicoinBalance": null,
    "transactions": [],
    "picture": "picture.png",
    "jobTitle": "Consultant"
  },
  {
    "id": 2,
    "userName": "kirkpatrick",
    "firstName": "Cullen",
    "lastName": "Kirkpatrick",
    "walletAddress": "0x0e9b86F67E32898A6080D595616486FeFb0b46BD",
    "unicoinBalance": null,
    "transactions": [],
    "picture": "picture.png",
    "jobTitle": "Consultant"
  },
  {
    "id": 1,
    "userName": "knowlan",
    "firstName": "Patrick",
    "lastName": "Knowlan",
    "walletAddress": "0x022e7A06f2DE6FD453227fEfa29fc5FD490879B5",
    "unicoinBalance": null,
    "transactions": [],
    "picture": "picture.png",
    "jobTitle": "Consultant"
  },
  {
    "id": 3,
    "userName": "sharpe",
    "firstName": "Larry",
    "lastName": "Sharpe",
    "walletAddress": "0x0e9b86F67E32898A6080D595616486FeFb0b46BD",
    "unicoinBalance": 0,
    "transactions": [],
    "picture": "picture.png",
    "jobTitle": "Consultant"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page


// Get all characters
app.get("/users", function(req, res) {
  res.json(users);
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:users?", function(req, res) {
  var chosen = req.params.usersId;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < users.length; i++) {
      if (chosen === users[i].id) {
        return res.json(users[i]);
      }
    }
    return res.json(false);
  }
  return res.json(users);
});


// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
