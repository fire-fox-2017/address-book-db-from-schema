const repl = require('repl');
const fs = require('fs');
let dummy_contact = JSON.parse(fs.readFileSync('contacts.json', 'utf-8'));
let dummy_con_groups = JSON.parse(fs.readFileSync('contact_group.json', 'utf-8'));
let dummy_group = JSON.parse(fs.readFileSync('groups.json', 'utf-8'))
// console.log(dummy_contact[0]);
// console.log(dummy_con_groups[0]);
// console.log(dummy_group[0].name);

const sqlite3 = require('sqlite3').verbose();
const file = 'address.db'
const db = new sqlite3.Database(file)


const contact = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL, company VARCHAR, phone INTEGER, email TEXT);"
const con_group = "CREATE TABLE IF NOT EXISTS Contacts_Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER);"
const group = "CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name VARCHAR NOT NULL);"


// const SEED_DATA = "INSERT INTO Student (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'),('Riza','Fahmi','1983-12-31');"

//CREATE_TABLE
let create_table = () => {
  db.serialize(()=>{ //Run SQL one at a time
    db.run(contact, (err)=>{
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    })

    db.run(con_group, (err)=>{
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    })

    db.run(group, (err)=>{
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    })

  })
}


//SEED_DATA
let seedDataContact = ()=>{
  for (let i = 0; i < dummy_contact.length; i++) {
    let seedData = `INSERT INTO Contacts (name, company, phone, email) VALUES ('${dummy_contact[i].name}','${dummy_contact[i].company}','${dummy_contact[i].phone}','${dummy_contact[i].email}')`
    // console.log(dummy_contact);
    db.serialize(()=>{ //Run SQL one at a time
      db.run(seedData, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('SUCESS');
        }
      })
    })
  }
}
let seedDataContactGroup = () => {
  for (let i = 0; i < dummy_con_groups.length; i++) {
    let seedData = `INSERT INTO Contacts_Groups (contact_id, group_id) VALUES ('${dummy_con_groups[i].contacts_id}','${dummy_con_groups[i].groups_id}')`
    db.serialize(()=>{ //Run SQL one at a time
      db.run(seedData, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('SUCESS');
        }
      })
    })
  }
}
let seedDataGroup = ()=>{
  // console.log(dummy_group[0].name);
  for (let i = 0; i < dummy_group.length; i++) {
    let seedData = `INSERT INTO Groups (group_name) VALUES ('${dummy_group[i].name}')`
    db.serialize(()=>{ //Run SQL one at a time
      db.run(seedData, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('SUCESS');
        }
      })
    })
  }
}

const replServer = repl.start({prompt: '> '})

replServer.context.createTable = create_table
replServer.context.seedDataContact = seedDataContact
replServer.context.seedDataContactGroup = seedDataContactGroup
replServer.context.seedDataGroup = seedDataGroup
// replServer.context.con_group = con_group
// replServer.context.group = group
