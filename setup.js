const repl = require('repl');
const fs = require('fs');
let contacts = JSON.parse(fs.readFileSync('contacts.json', 'utf-8'));
let contacts_groups = JSON.parse(fs.readFileSync('contact-group.json', 'utf-8'));
let groups = JSON.parse(fs.readFileSync('groups.json', 'utf-8'));

const sqlite3 = require('sqlite3').verbose();
const file = 'address.db';
const db = new sqlite3.Database(file);


const contact = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL, company VARCHAR, phone INTEGER, email TEXT);"
const contact_group = "CREATE TABLE IF NOT EXISTS Contacts_Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER);"
const group = "CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name VARCHAR NOT NULL);"


//CREATE_TABLE
let createTable = () => {
  db.serialize(()=>{ //Run SQL one at a time
    db.run(contact, (err)=>{
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE CONTACTS SUCCESS');
      }
    })

    db.run(contact_group, (err)=>{
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE CONTACTS_GROUPS SUCCESS');
      }
    })

    db.run(group, (err)=>{
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE GROUPS SUCCESS');
      }
    })
  })
}


//SEED_DATA
let seedDataContact = ()=>{
  for (let i = 0; i < contacts.length; i++) {
    let seedData = `INSERT INTO Contacts (name, company, phone, email) VALUES ('${contacts[i].name}','${contacts[i].company}','${contacts[i].phone}','${contacts[i].email}')`
    // console.log(contact);
    db.serialize(()=>{ //Run SQL one at a time
      db.run(seedData, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('INSERT CONTACT SUCESS');
        }
      })
    })
  }
}
let seedDataContactGroup = () => {
  for (let i = 0; i < contacts_groups.length; i++) {
    let seedData = `INSERT INTO Contacts_Groups (contact_id, group_id) VALUES ('${contacts_groups[i].contact_id}','${contacts_groups[i].group_id}')`
    db.serialize(()=>{ //Run SQL one at a time
      db.run(seedData, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('INSERT CONTACT_GROUP SUCESS');
        }
      })
    })
  }
}
let seedDataGroup = ()=>{
  for (let i = 0; i < groups.length; i++) {
    let seedData = `INSERT INTO Groups (group_name) VALUES ('${groups[i].name}')`
    db.serialize(()=>{ //Run SQL one at a time
      db.run(seedData, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('INSERT GROUP SUCESS');
        }
      })
    })
  }
}

const replServer = repl.start({prompt: '> '})

replServer.context.createTable = createTable
replServer.context.seedDataContact = seedDataContact
replServer.context.seedDataContactGroup = seedDataContactGroup
replServer.context.seedDataGroup = seedDataGroup
