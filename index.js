// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var _ = require('lodash');
var Promise = require('promise');
var users = require("./users.json");
var products = require("./products.json");
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
  var balancePromises = [];
    var batch = new web3.BatchRequest();
  _.forEach(users, function(user) {
    batch.add((myContract.methods.balanceOf(user.walletAddress).call.request({from: user.wallet}, callback)));
    //console.log(user);
  });


  // batch.add(web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
  // batch.add(contract.methods.balance(address).call.request({from: '0x0000000000000000000000000000000000000000'}, callback2));
  batch.execute();

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
        console.log(users[i].wallet_address);
        myContract.methods.balanceOf(users[i].wallet_address).call({from: '0x75f628f2aCB0ADa5A48D329319c185dbf7f2BB59'}, function(error, result){
          console.log(result);
          selectedUser.unicoin_balance = result;
          return res.json(selectedUser);
        });
      }
    }
  }
});

app.get("/products", function(req, res) {
  res.json(products);
});

app.get("/products/:id?", function(req, res) {
  var productPage = require('./products/' + req.params.id +'.json');
  res.json(productPage);
});


// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});

function callback(error, result) {
  console.log('In callback');
  console.log(result);
}
