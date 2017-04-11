"use strict"
const repl = require('repl')
const sqlite = require('sqlite3').verbose();
const fs = require('fs');

var file = 'address_book.db';
var db = new sqlite.Database(file);

var CREATE_CONTACT = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company TEXT, phone_number INTEGER, email TEXT);"
var CREATE_GROUP = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);"
var CREATE_CONTACT_GROUP = "CREATE TABLE IF NOT EXISTS contacts_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER);"

let createContact = () => {
  // Run SQL one at a time
  db.serialize(function() {
    // Create table
    db.run(CREATE_CONTACT, function(err) {
      if (err) {
        console.log(err.message);
      } else {
        console.log('CREATED CONTACT');
      }
    });
  });
}

let createGroup = () => {
  // Run SQL one at a time
  db.serialize(function() {
    // Create table
    db.run(CREATE_GROUP, function(err) {
      if (err) {
        console.log(err.message);
      } else {
        console.log('CREATED GROUP');
      }
    });
  });
}

let createContactGroup = () => {
  db.serialize(function() {
    // Create table
    db.run(CREATE_CONTACT_GROUP, function(err) {
      if (err) {
        console.log(err.message);
      } else {
        console.log('CREATED CONTACT GROUP');
      }
    });
  });
}

let seedContact=()=>{
  let contact = JSON.parse(fs.readFileSync('dummycontact.json','utf8'));
  for (let i=0; i<contact.length; i++){
    db.serialize(function(){
      db.run(`INSERT INTO contacts (name, company, phone_number, email) VALUES ('${contact[i].name}', '${contact[i].company}', '${contact[i].phone_number}', '${contact[i].email}')`,function(err){
        if (err) {
          console.log(err.message);
        } else {
          console.log('SEED CONTACT');
        }
      })
    })
  }
}

let seedGroup=()=>{
  let group = JSON.parse(fs.readFileSync('dummygroup.json','utf8'));
  for (let i=0; i<group.length; i++){
    db.serialize(function(){
      db.run(`INSERT INTO groups (name) VALUES ('${group[i].name}')`,function(err){
        if (err) {
          console.log(err.message);
        } else {
          console.log('SEED GROUP');
        }
      })
    })
  }
}

let rp = repl.start('>> ')
rp.context.createContact = createContact;
rp.context.createGroup = createGroup;
rp.context.createContactGroup = createContactGroup;
rp.context.seedContact = seedContact;
rp.context.seedGroup = seedGroup;