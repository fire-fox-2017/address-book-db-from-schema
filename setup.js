//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
// const sqlite = require('sqlite');

var file = 'address_book.db';
var db = new sqlite.Database(file);


var CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company TEXT, phone TEXT, email TEXT );";
var CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL );";
var CREATE_TABLE_CONTACT_GROUPS = "CREATE TABLE IF NOT EXISTS contact_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, id_contact INTEGER, id_group INTEGER, FOREIGN KEY(id_contact) references contacts(id), FOREIGN KEY(id_group) references groups(id) );";

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
replServer.context.CREATE_TABLE_CONTACTS = CREATE_TABLE_CONTACTS;
replServer.context.CREATE_TABLE_GROUPS = CREATE_TABLE_GROUPS;
replServer.context.CREATE_TABLE_CONTACT_GROUPS = CREATE_TABLE_CONTACT_GROUPS;
