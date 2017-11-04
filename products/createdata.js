var fs = require('fs');
var team = require('./all.json');

console.log(team);

for (let t in team){
  const fname = "./" + team[t].id + ".json";
  fs.writeFile(fname, JSON.stringify(team[t], null, 2) , function(err) {
    if(err) {
      return console.log(err);
    }

    console.log(fname + " was saved!");
  });
}
