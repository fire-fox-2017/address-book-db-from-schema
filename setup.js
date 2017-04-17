const repl = require('repl');
const replServer = repl.start({prompt: '>>> '})
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const file = 'address.db';
const db = new sqlite3.Database(file);
let tempContact = JSON.parse(fs.readFileSync('contact.json'));
let tempContactGroup = JSON.parse(fs.readFileSync('contact_group.json'));
let tempGroup = JSON.parse(fs.readFileSync('group.json'));

//CREATE_TABLE
let createTable = () => {
  db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL, company VARCHAR, phone VARCHAR, email TEXT);", (err)=>{
      if (err) {
        console.log(err);
      } else {
        console.log('Table created');
      }
    })
    db.run("CREATE TABLE IF NOT EXISTS Contacts_Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER);", (err)=>{
      if (err) {
        console.log(err);
      } else {
        console.log('Table created');
      }
    })
    db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name VARCHAR NOT NULL);", (err)=>{
      if (err) {
        console.log(err);
      } else {
        console.log('Table created');
      }
    })
  })
}


//SEED_DATA
let seedContact = ()=>{
  for (let i = 0; i < tempContact.length; i++) {
    let temp = `INSERT INTO Contacts (name, company, phone, email) VALUES ('${tempContact[i].name}','${tempContact[i].company}','${tempContact[i].phone}','${tempContact[i].email}')`
    db.serialize(()=>{
      db.run(temp, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('Data added');
        }
      })
    })
  }
}
let seedContactGroup = () => {
  for (let i = 0; i < tempContactGroup.length; i++) {
    let temp = `INSERT INTO Contacts_Groups (contact_id, group_id) VALUES ('${tempContactGroup[i].contacts_id}','${tempContactGroup[i].groups_id}')`
    db.serialize(()=>{ //Run SQL one at a time
      db.run(temp, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('Data added');
        }
      })
    })
  }
}
let seedGroup = ()=>{
  for (let i = 0; i < tempGroup.length; i++) {
    let temp = `INSERT INTO Groups (group_name) VALUES ('${tempGroup[i].name}')`
    db.serialize(()=>{ //Run SQL one at a time
      db.run(temp, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('Data added');
        }
      })
    })
  }
}

replServer.context.createTable = createTable;
replServer.context.seedContact = seedContact;
replServer.context.seedContactGroup = seedContactGroup;
replServer.context.seedGroup = seedGroup;
