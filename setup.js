"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()
let file = 'address_book.db';
let db = new sqlite.Database(file)
let fs = require('fs')
let data = JSON.parse(fs.readFileSync("data.json","utf-8"))

let CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts ( id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT, phone TEXT, email TEXT, created_at DATE);"
let CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT NOT NULL, created_at DATE);"
let CREATE_TABLE_GROUP_CONTACTS = "CREATE TABLE IF NOT EXISTS group_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id), FOREIGN KEY(group_id) REFERENCES groups(id));"
let SEED_DATA_CONTACTS = "INSERT INTO contacts(first_name, last_name, phone, email, created_at) VALUES"
let SEED_DATA_GROUPS = "INSERT INTO groups(group_name, created_at) VALUES"
let SEED_DATA_GROUP_CONTACTS = "INSERT INTO group_contacts(contact_id, group_id) VALUES"

for (let i = 0; i < data.contacts.length; i++){
  if(i < data.contacts.length-1){
    SEED_DATA_CONTACTS += `('${data.contacts[i].first_name}','${data.contacts[i].last_name}','${data.contacts[i].phone}','${data.contacts[i].email}','${data.contacts[i].created_at}'),`
  } else {
    SEED_DATA_CONTACTS += `('${data.contacts[i].first_name}','${data.contacts[i].last_name}','${data.contacts[i].phone}','${data.contacts[i].email}','${data.contacts[i].created_at}')`
  }
}

for(let j = 0; j < data.groups.length; j++){
  if(j < data.groups.length-1){
    SEED_DATA_GROUPS += `('${data.groups[j].group_name}','${data.groups[j].created_at}'),`
  } else {
    SEED_DATA_GROUPS += `('${data.groups[j].group_name}','${data.groups[j].created_at}')`
  }
}

for(let k = 0; k < data.group_contacts.length; k++){
  if(k < data.group_contacts.length-1){
    SEED_DATA_GROUP_CONTACTS += `('${data.group_contacts[k].contact_id}','${data.group_contacts[k].group_id}'),`
  } else {
    SEED_DATA_GROUP_CONTACTS += `('${data.group_contacts[k].contact_id}','${data.group_contacts[k].group_id}')`
  }
}

let createTableContacts = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE_CONTACTS, function(err) {
      if(err){
        console.log(err)
      } else {
        console.log('TABLE CONTACTS BERHASIL DIBUAT');
      }
    })
  })
}

let createTableGroups = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE_GROUPS, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('TABLE GROUP BERHASIL DIBUAT');
      }
    })
  })
}

let createTableGroupContacts = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE_GROUP_CONTACTS, function(err) {
      if(err) {
        console.log(err)
      } else {
        console.log(`TABLE GROUP_CONTACS BERHASIL DIBUAT`)
      }
    })
  })
}

let seedDataContacts = () => {
  db.serialize(function() {
    db.run(SEED_DATA_CONTACTS, function(err) {
      if(err){
        console.log(err)
      } else {
        console.log('SEED CONTACTS BERHASIL DIBUAT');
      }
    })
  })
}

let seedDataGroups = () => {
  db.serialize(function() {
    db.run(SEED_DATA_GROUPS, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('SEED GROUP BERHASIL DIBUAT');
      }
    })
  })
}

let seedDataGroupContacts = () => {
  db.serialize(function() {
    db.run(SEED_DATA_GROUP_CONTACTS, function(err) {
      if(err) {
        console.log(err)
      } else {
        console.log(`SEED GROUP_CONTACS`)
      }
    })
  })
}

let start = repl.start('> ')
start.context.createTableContacts       = createTableContacts
start.context.createTableGroups         = createTableGroups
start.context.createTableGroupContacts  = createTableGroupContacts
start.context.seedDataContacts          = seedDataContacts
start.context.seedDataGroups            = seedDataGroups
start.context.seedDataGroupContacts = seedDataGroupContacts
