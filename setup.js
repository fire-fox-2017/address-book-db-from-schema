"use strict"
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = 'contacts.db';
var db = new sqlite.Database(file);
var fs = require('fs');
var CREATE_TABEL_CONTACS =
  "CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company TEXT NOT NULL ,email TEXT NOT NULL ,phone_number TEXT NOT NULL )"
var CREATE_TABEL_GROUPS =
  "CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"
var CREATE_TABEL_GROUPS_CONTACS =
  "CREATE TABLE IF NOT EXISTS groups_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER, contact_id INTEGER, FOREIGN KEY(group_id) REFERENCES groups (id), FOREIGN KEY(contact_id) REFERENCES contacts (id))"
let createTable = () => {
  db.serialize(function() {
    db.run(CREATE_TABEL_CONTACS, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Contact Table created');
      }
    })
    db.run(CREATE_TABEL_GROUPS, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Group table created');
      }
    })
    db.run(CREATE_TABEL_GROUPS_CONTACS, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Pivot group contact table created');
      }
    })
  })
}
let initData = (contactsFromJSONFile, groupsFromJSONFile, contactGroup) => {
  let INSERT_CONTACT = `INSERT INTO contacts (name, company, email, phone_number) VALUES (?,?,?,?)`
  let INSERT_GROUP = `INSERT INTO groups (name) VALUES (?)`
  let INSERT_CONTACT_GROUP = `INSERT INTO groups_contacts (group_id, contact_id) VALUES (?,?)`
  db.serialize(function() {
    for (let i = 0; i < contactsFromJSONFile.length; i++) {
      db.run(INSERT_CONTACT, [contactsFromJSONFile[i].name, contactsFromJSONFile[i].company,
        contactsFromJSONFile[i].email, contactsFromJSONFile[i].phone_number
      ], function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Contacts migrated to database');
        }
      })
    }
    for (let i = 0; i < groupsFromJSONFile.length; i++) {
      db.run(INSERT_GROUP, [groupsFromJSONFile[i].name], function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Groups migrated to database ');
        }
      })
    }
    for (let i = 0; i < contactGroup.length; i++) {
      db.run(INSERT_CONTACT_GROUP, [contactGroup[i].contact_id, contactGroup[i].group_id], function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Contact and Groups migrated to database ');
        }
      })
    }
  })
}
createTable();
let contactsData = JSON.parse(fs.readFileSync("contacts.json").toString())
let groupsData = JSON.parse(fs.readFileSync("groups.json").toString())
let contactGroupData = JSON.parse(fs.readFileSync("contacts_groups.json").toString())
initData(contactsData, groupsData, contactGroupData)