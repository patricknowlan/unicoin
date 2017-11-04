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

var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/"));

var ethInterface = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string",
        "value": "Unicoin 2.0"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      }, {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "value": "540"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      }, {
        "name": "_to",
        "type": "address"
      }, {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "value": "0"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "value": "0"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [
      {
        "name": "target",
        "type": "address"
      }, {
        "name": "mintedAmount",
        "type": "uint256"
      }
    ],
    "name": "mintToken",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      }, {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "burnFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string",
        "value": "🦄"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      }, {
        "name": "_to",
        "type": "address"
      }, {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }, {
        "name": "",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "value": "0"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [
      {
        "name": "initialSupply",
        "type": "uint256",
        "index": 0,
        "typeShort": "uint",
        "bits": "256",
        "displayName": "initial Supply",
        "template": "elements_input_uint",
        "value": "540"
      }, {
        "name": "tokenName",
        "type": "string",
        "index": 1,
        "typeShort": "string",
        "bits": "",
        "displayName": "token Name",
        "template": "elements_input_string",
        "value": "Unicoin 2.0"
      }, {
        "name": "tokenSymbol",
        "type": "string",
        "index": 2,
        "typeShort": "string",
        "bits": "",
        "displayName": "token Symbol",
        "template": "elements_input_string",
        "value": "🦄"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }, {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      }, {
        "indexed": true,
        "name": "to",
        "type": "address"
      }, {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      }, {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Burn",
    "type": "event"
  }
];

var myContract = new web3.eth.Contract(ethInterface, "0x9b143D56cAf24e471BB54a50F159401F420FfAAe", {from: '0x75f628f2aCB0ADa5A48D329319c185dbf7f2BB59'});

// =============================================================
var users = [
  {
    "id": 1,
    "userName": "lundstrom",
    "firstName": "Jeremy",
    "lastName": "Lundstrom",
    "walletAddress": "0x0e9b86F67E32898A6080D595616486FeFb0b46BD",
    "unicoinBalance": 0,
    "transactions": [],
    "picture": "picture.png",
    "jobTitle": "Consultant"
  },
  {
    "id": 2,
    "userName": "kirkpatrick",
    "firstName": "Cullen",
    "lastName": "Kirkpatrick",
    "walletAddress": "0x75f628f2aCB0ADa5A48D329319c185dbf7f2BB59",
    "unicoinBalance": 0,
    "transactions": [],
    "picture": "picture.png",
    "jobTitle": "Consultant"
  },
  {
    "id": 3,
    "userName": "knowlan",
    "firstName": "Patrick",
    "lastName": "Knowlan",
    "walletAddress": "0x022e7A06f2DE6FD453227fEfa29fc5FD490879B5",
    "unicoinBalance": 0,
    "transactions": [],
    "picture": "picture.png",
    "jobTitle": "Consultant"
  },
  {
    "id": 4,
    "userName": "sharpe",
    "firstName": "Larry",
    "lastName": "Sharpe",
    "walletAddress": "0x5f5c03f9bdb02e911ca84d0c350da895a5769137",
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
