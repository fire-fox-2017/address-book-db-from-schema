"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const fs = require('fs');

const file = 'address_book.db';
const db = new sqlite.Database(file);


let contactSeeder = JSON.parse(fs.readFileSync('contacts.json', 'utf-8'));
let contactGroupSeeder = JSON.parse(fs.readFileSync('contacts_group.json', 'utf-8'));
let groupSeeder = JSON.parse(fs.readFileSync('groups.json', 'utf-8'))




const CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL, company VARCHAR, phone INTEGER, email TEXT)";
const CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name VARCHAR NOT NULL)";
const CREATE_TABLE_CONTACTS_GROUPS = "CREATE TABLE IF NOT EXISTS contacts_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER)";

let createTable = () => {

  db.serialize(() => {

    db.run(CREATE_TABLE_CONTACTS, (err) => {
      if(err) { console.log(err) }
        else {
          console.log('table contacts created!');
        }
    });
    
    db.run(CREATE_TABLE_GROUPS, (err) => {
      if(err) { console.log(err) }
        else {
          console.log('table groups created!');
        }
    });

    db.run(CREATE_TABLE_CONTACTS_GROUPS, (err) => {
      if(err) { console.log(err) }
        else {
          console.log('table contacts_groups created!');
        }
    });

  }); // db.serialize

} // createTable 


let seedDataContact = () => {
  for (let i = 0; i < contactSeeder.length; i++) {
    let seedData = `INSERT INTO contacts (name, company, phone, email) VALUES ('${contactSeeder[i].name}','${contactSeeder[i].company}','${contactSeeder[i].phone}','${contactSeeder[i].email}')`
    db.serialize(()=>{ 
      db.run(seedData, (err)=>{
        err ? console.log(err) : console.log('success seed data contact');
      });
    });
  }
}

let seedDataContactGroup = () => {
  for (let i = 0; i < contactGroupSeeder.length; i++) {
    let seedData = `INSERT INTO contacts_groups (contact_id, group_id) VALUES ('${contactGroupSeeder[i].contact_id}','${contactGroupSeeder[i].group_id}')`
    db.serialize(()=>{
      db.run(seedData, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('success seed data contact group');
        }
      })
    })
  }
}

let seedDataGroup = ()=>{
  for (let i = 0; i < groupSeeder.length; i++) {
    let seedData = `INSERT INTO groups (group_name) VALUES ('${groupSeeder[i].name}')`
    db.serialize(()=>{ //Run SQL one at a time
      db.run(seedData, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('success seed data group');
        }
      })
    })
  }
}

const replServer = repl.start({prompt: '> '});

replServer.context.createTable = createTable;
replServer.context.seedDataContact = seedDataContact;
replServer.context.seedDataContactGroup = seedDataContactGroup;
replServer.context.seedDataGroup = seedDataGroup;


  