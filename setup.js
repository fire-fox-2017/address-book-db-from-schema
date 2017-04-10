"use strict"

const fs = require('fs');
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let replServer = repl.start({prompt: '> '});

let file = 'address_book.db';
let db = new sqlite.Database(file);


let contactsData = JSON.parse(fs.readFileSync('contacts.json').toString());


let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birth_date TEXT)";

let createTable = () => {
  db.serialize(() => {
    db.run(CREATE_TABLE, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    })
  });
}

let seedData = (firstname, lastname, birth_date) => {
  db.serialize(() => {
    db.run(`INSERT INTO students (firstname, lastname, birth_date) VALUES ('${firstname}', '${lastname}', '${birth_date}')`, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`Data has been succesfully appended.`);
      }
    });
  });
}

replServer.context.createTable = createTable;
replServer.context.seedData = seedData;
