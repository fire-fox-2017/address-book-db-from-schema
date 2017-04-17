"use strict"

const repl = require('repl');
const fs = require('fs');
//baca file json lalu jadikan dia array
let dummyOfContacts = JSON.parse('contacts.json', 'utf-80');
let dummyOfContacts_group = JSON.parse('contacts_group.json', 'utf-80');
let dummyOfGroups = JSON.parse('groups.json', 'utf-80');

const sqlite = require('sqlite3').verbose();
const file = 'address.db';
const db = new sqlite.Database(file);

//console.log(dummyOfContacts[0]);
//console.log(dummyOfGroups[0]);
//console.log(dummyOfContacts_group[0]);

const createTableContacts = `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, company VARCHAR, phone VARCHAR, email TEXT);`
const createTableContacts_group = `CREATE TABLE IF NOT EXISTS contacts_group (id INTEGER PRIMARY KEY AUTOINCREMENT, contacts_id INTEGER, groups_id INTEGER);`
const createTableGroups = `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name VARCHAR NOT NULL);`

//create TABLE
class Table {
  constructor() {
  }

  static create_table = () => {
    db.serialize(()=>{
      db.run(createTableContacts, (err)=> {
        if (!err){
          console.log(`process sucess!`)
        } else {
          console.log(`Error : ${err}`)
        }
      })
      db.run(createTableContacts_group, (err)=> {
        if (!err){
          console.log(`process sucess!`)
        } else {
          console.log(`Error : ${err}`)
        }
      })
      db.run(createTableGroups, (err)=> {
        if (!err){
          console.log(`process sucess!`)
        } else {
          console.log(`Error : ${err}`)
        }
      })
    })
  }

  static seedDataContact = () => {
    for (let i=0; i<dummyOfContacts.length; i++){
      let seedDataContact = `INSERT INTO contacts (name, company, phone, email) VALUES ('${dummyOfContacts[i].name}','${dummyOfContacts[i].company}','${dummyOfContacts[i].phone}','${dummyOfContacts[i].email}');`
      db.serialize(()=>{
        db.run(seedDataContact, (err) => {
          if(!err){
            console.log(`process sucess`)
          } else {
            console.log(`Error : ${err}`)
          }
        })
      })
    }
  }
  static seedDataContactGroup = () => {
    for (let i=0; i<dummyOfContacts_group.length; i++){
      let seedDataContactGroup = `INSERT INTO contacts_group (contacts_id, groups_id) VALUES ('${dummyOfContacts_group[i].contacts_id}','${dummyOfContacts_group[i].groups_id}');`
      db.serialize(()=>{
        db.run(seedDataContactGroup, (err) => {
          if(!err){
            console.log(`process sucess`)
          } else {
            console.log(`Error : ${err}`)
          }
        })
      })
    }
  }
  static seedDataGroup =() => {
    for (let i=0; i<dummyOfGroups.length; i++){
      let seedDataGroup = `INSERT INTO groups (group_name) VALUES ('${dummyOfGroups[i].name}');`
      db.serialize(()=>{
        db.run(seedDataGroup, (err)=>{
          if(!err){
            console.log(`process success`)
          }else {
            console.log(`Error : ${err}`)
          }
        })
      })
    }
  }
}

const replServer = repl.start({prompt: '> '})

replServer.context.createTableContacts = Table.createTableContacts
replServer.context.createTableGroups = Table.createTableGroups
replServer.context.createTableContacts_group = Table.createTableContacts_group
replServer.context.seedDataContact = Table.seedDataContact
replServer.context.seedDataGroup = Table.seedDataGroup
replServer.context.seedDataContactGroup = Table.seedDataContactGroup
