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

let file_json = "contact.json";
var fs = require('fs');
let ContactData = fs.readFileSync(file_json)
  .toString();

let contact_json = JSON.parse(ContactData);
// console.log(contact_json);

let seedContact = (contact_json) => {

  for (let i = 0 ; i < contact_json.length ; i++) {
    let query = `INSERT INTO contacts (name, company, phone, email) VALUES ('${contact_json[i].name}', '${contact_json[i].company}', '${contact_json[i].phone}', '${contact_json[i].email}');`

    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log(`Inserted Contact ${contact_json[i].name}`);
        }
      });
    });

  }
}

// seedContact(contact_json);
let file_json2 = 'group.json';
let GroupData = fs.readFileSync(file_json2)
  .toString();

let group_json = JSON.parse(GroupData);
// console.log(group_json);


let seedGroup = (group_json) => {

  for (let i = 0 ; i < group_json.length ; i++) {
    let query = `INSERT INTO groups (name) VALUES ('${group_json[i].name}');`

    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log(`Inserted Group ${group_json[i].name}`);
        }
      });
    });

  }
}

// seedGroup(group_json);



//
//
const replServer = repl.start({prompt: '$ '});

replServer.context.createTable = createTable;
replServer.context.CREATE_TABLE_CONTACTS = CREATE_TABLE_CONTACTS;
replServer.context.CREATE_TABLE_GROUPS = CREATE_TABLE_GROUPS;
replServer.context.CREATE_TABLE_CONTACT_GROUPS = CREATE_TABLE_CONTACT_GROUPS;

replServer.context.seedContact = seedContact;
replServer.context.seedGroup = seedGroup;
replServer.context.contact_json = contact_json;
replServer.context.group_json = group_json;
