//write your code here
const repl = require('repl');
const replServer = repl.start('$ ');
const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('addressbook.db');
var fs = require('fs');

var table_contacts = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING NOT NULL, company STRING, phone STRING, email STRING );";
var table_groups = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING NOT NULL );";
var table_contactGroups = "CREATE TABLE IF NOT EXISTS contact_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, id_contact INTEGER, id_group INTEGER, FOREIGN KEY(id_contact) references contacts(id), FOREIGN KEY(id_group) references groups(id) );";


let tables=[table_contacts,table_groups,table_contactGroups];

let createTables = () => {
  for(let i=0;i<tables.length;i++){
    db.serialize(function () {
      db.run(tables[i], function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('Table has been Created');
        }
      });
    });
  }
}


let contact_json = fs.readFileSync('contact.json').toString();
let contact = JSON.parse(contact_json);

let seedContact = () => {
  for (let i = 0 ; i < contact.length ; i++) {
    let query = `INSERT INTO contacts (name, company, phone, email) VALUES ('${contact[i].name}', '${contact[i].company}', '${contact[i].phone}', '${contact[i].email}');`
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log(`Contact: ${contact[i].name} Has Been Inserted`);
        }
      });
    });
  }
}


let group_json = fs.readFileSync('group.json').toString();
let group = JSON.parse(group_json);

let seedGroup = () => {
  for (let i = 0 ; i < group.length ; i++) {
    let query = `INSERT INTO groups (name) VALUES ('${group[i].name}');`
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log(`Group: ${group[i].name} Has Been Inserted`);
        }
      });
    });
  }
}

let seedTables = ()=>{
  seedContact();
  seedGroup();
}

replServer.context.createTables = createTables;
replServer.context.seedTables = seedTables;
