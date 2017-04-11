"use strict"

const fs = require('fs');
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let replServer = repl.start({prompt: '> '});

let file = 'address_book.db';
let db = new sqlite.Database(file);

// Read JSON data for contacts, groups, and group_contacts
let contactsData = JSON.parse(fs.readFileSync('contacts.json').toString());
let groupsData = JSON.parse(fs.readFileSync('groups.json').toString());
let groupContactsData = JSON.parse(fs.readFileSync('group_contacts.json').toString());

// Functions to create Tables
let createTableContacts = () => {
  let query = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, email TEXT, phone TEXT, company TEXT)";
  db.serialize(() => {
    db.run(query, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE: CONTACTS');
      }
    })
  });
}

let createTableGroups = () => {
  let query = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT NOT NULL)";
  db.serialize(() => {
    db.run(query, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE: GROUPS');
      }
    })
  });
}

let createTableGroupContacts = () => {
  let query = "CREATE TABLE IF NOT EXISTS group_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER, contact_id INTEGER)";
  db.serialize(() => {
    db.run(query, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE: GROUP_CONTACTS');
      }
    })
  });
}

// Functions to fill the tables up
let seedContacts = () => {
  for (let i = 0; i < contactsData.length; i++) {
    let query = `INSERT INTO contacts (firstname, lastname, email, phone, company) VALUES ('${contactsData[i].first_name}', '${contactsData[i].last_name}', '${contactsData[i].email}', '${contactsData[i].phone}', '${contactsData[i].company}')`;
    db.serialize(() => {
      db.run(query, (err) => {
        if(err) {
          console.log(err);
        } else {
          if (i === contactsData.length - 1) {
            console.log(`Contacts has been succesfully seeded.`);
          }
        }
      });
    });
  }
}

let seedGroups = () => {
  for (let i = 0; i < groupsData.length; i++) {
    let query = `INSERT INTO groups (group_name) VALUES ('${groupsData[i].group_name}')`;
    db.serialize(() => {
      db.run(query, (err) => {
        if(err) {
          console.log(err);
        } else {
          if (i === groupsData.length - 1) {
            console.log(`Groups has been succesfully added.`);
          }
        }
      });
    });
  }
}

let seedGroupContacts = () => {
  for (let i = 0; i < groupContactsData.length; i++) {
    let query = `INSERT INTO group_contacts (group_id, contact_id) VALUES ('${groupContactsData[i].group_id}','${groupContactsData[i].contact_id}' )`;
    db.serialize(() => {
      db.run(query, (err) => {
        if(err) {
          console.log(err);
        } else {
          if (i === groupsData.length - 1) {
            console.log(`Group-contacts has been succesfully added.`);
          }
        }
      });
    });
  }
}

// REPL COMMANDS
replServer.context.createTableContacts = createTableContacts;
replServer.context.seedContacts = seedContacts;
replServer.context.createTableGroups = createTableGroups;
replServer.context.seedGroups = seedGroups;
replServer.context.createTableGroupContacts = createTableGroupContacts;
replServer.context.seedGroupContacts = seedGroupContacts;
