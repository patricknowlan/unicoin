// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var users = require("./users.json");
var ethInterface = require('./interface.json');

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/"));

var myContract = new web3.eth.Contract(ethInterface, "0x9b143D56cAf24e471BB54a50F159401F420FfAAe", {from: '0x75f628f2aCB0ADa5A48D329319c185dbf7f2BB59'});

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page


// Get all characters
app.get("/users", function(req, res) {
  res.json(users);
});

// Search for Specific Character (or all characters) - provides JSON
// Search for Specific Character (or all characters) - provides JSON
app.get("/users/:id?", function(req, res) {
  var chosen = req.params.id;
  var selectedUser;

  if (chosen) {
    for (var i = 0; i < users.length; i++) {
      if (chosen == users[i].id) {
        selectedUser = users[i];
        myContract.methods.balanceOf(users[i].walletAddress).call({from: '0x75f628f2aCB0ADa5A48D329319c185dbf7f2BB59'}, function(error, result){
          selectedUser.unicoinBalance = result;
          return res.json(selectedUser);
        });
      }
    }
  }
});


// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
