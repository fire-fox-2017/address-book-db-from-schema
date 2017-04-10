//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
// const sqlite = require('sqlite');

var file = 'address_book.db';
var db = new sqlite.Database(file);


var CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company TEXT, phone TEXT, email TEXT );";
var CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL );";



let createTable = (query) => {
  db.serialize(function () {
    db.run(query, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Created TABLE');
      }
    });
  });
}


const replServer = repl.start({prompt: '$ '});

replServer.context.createTable = createTable;
