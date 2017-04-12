"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const fs = require('fs');

import Contact from "./contact.js";
import Group from "./group.js";
import GroupContact from "./contact-group.js";

let file = 'address_book.db';
var db = new sqlite.Database(file);

let dummyGroups = JSON.parse(fs.readFileSync('groups.json', 'utf8'));
let dummyContacts = JSON.parse(fs.readFileSync('contacts.json', 'utf8'));

//Inisialisasi dummy data
let createDummyData = () =>{
  db.serialize(function(){

    for(let i=0; i<dummyGroups.length; i++)
      db.run(`INSERT INTO groups(group_name) VALUES('${dummyGroups[i].group_name}')`, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('CREATE TABLE GROUP SUKSES');
        }
      });

      for(let i=0; i<dummyContacts.length; i++)
        db.run(`INSERT INTO contacts(name, company, phone, email) VALUES('${dummyContacts[i].name}', '${dummyContacts[i].company}', '${dummyContacts[i].phone}', '${dummyContacts[i].email}')`, function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log('CREATE TABLE CONTACS SUKSES');
          }
        });

  });// PENUTUP SERIALIZE
}

let start = repl.start("> ")
start.context.createDummyData = createDummyData
start.context.Contact = Contact
start.context.Group = Group
start.context.GroupContact = GroupContact
