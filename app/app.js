'use strict';

var express = require('express');
var lib = require('./sqliteHelper/functions');
var http = require('http');
var path = require('path');
var sqlite3 = require('sqlite3').verbose()
var db =  new sqlite3.Database('./db/test.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

var app = express();
var server = http.createServer(app);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname + '/about.html'));
});

app.use(express.static('./'));

server.listen(3000, 'localhost');
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
db.serialize(function() {
  // db.run("CREATE TABLE if not exists user_info (name TEXT,info TEXT)");
  // var stmt = db.prepare("INSERT INTO user_info VALUES (?,?)");
  // for (var i = 0; i < 10; i++) {
  //     stmt.run("Ipsum ","LOREM");
  // }
  // stmt.finalize();

  db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});


db.close()

module.exports = {
  readAll: function(){
    db.all("SELECT * from user_info",function(err,rows){
      console.log(rows.length);
    });
  }
}

