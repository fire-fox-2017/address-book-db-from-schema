"use strict"

const fs = require('fs')
const sqlite = require('sqlite3').verbose()
const file = 'address_book.db'
const db = new sqlite.Database(file)
const repl = require('repl')
let replServer = repl.start({
    prompt: '> '
})

// Contacts
let setup = () => {
    db.serialize(() => {
        let CREATE_TABLE_CONTACTS = `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company TEXT, phone TEXT, email TEXT)`
        db.run(CREATE_TABLE_CONTACTS, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Create table contacts success');
            }
        })

        let CREATE_TABLE_GROUPS = `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)`
        db.run(CREATE_TABLE_GROUPS, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Create table groups success');
            }
        })

        let CREATE_TABLE_CONTACTS_GROUPS = `CREATE TABLE IF NOT EXISTS contactGroups (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER, is_deleted BOOLEAN)`
        db.run(CREATE_TABLE_CONTACTS_GROUPS, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Create table contacts_groups success');
            }
        })
    })
}

// let fileContactsJSON = 'contacts.json'
// let contactsData = fs.readFileSync(fileContactsJSON).toString()
// let contactsJSON = JSON.parse(contactsData)
// console.log(contactsJSON[0].firstname);

/*
let seed_contacts = () => {
    db.serialize(() => {
        for (let i = 0; i < contactsJSON.length; i++) {
            let SEED_CONTACTS = `INSERT INTO contacts (firstname, lastname, company, phone, email) VALUES ('${contactsJSON[i].firstname}', '${contactsJSON[i].lastname}', '${contactsJSON[i].company}', '${contactsJSON[i].phone}', '${contactsJSON[i].email}');`

            db.run(SEED_CONTACTS, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Insert ${contactsJSON[i].firstname}, ${contactsJSON[i].lastname}, ${contactsJSON[i].company}, ${contactsJSON[i].phone}, ${contactsJSON[i].email}`);
                }
            })
        }
    })
}
*/

// Group
/*
let create_table_groups = () => {
    db.serialize(() => {
        let CREATE_TABLE_GROUPS = `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);`
        db.run(CREATE_TABLE_GROUPS, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Create table groups success');
            }
        })
    })
}

let fileGroupsJSON = 'groups.json'
let groupsData = fs.readFileSync(fileGroupsJSON).toString()
let groupJSON = JSON.parse(groupsData)
// console.log(groupJSON);

let seed_groups = () => {
    db.serialize(() => {
        for (let i = 0; i < groupJSON.length; i++) {
            let SEED_GROUPS = `INSERT INTO groups (name) VALUES ('${groupJSON[i].name}');`

            db.run(SEED_GROUPS, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Insert ${groupJSON[i].name} to table groups`);
                }
            })
        }
    })
}

// Contact Group
let create_table_contacts_groups = () => {
    db.serialize(() => {
        let CREATE_TABLE_CONTACTS_GROUPS = `CREATE TABLE IF NOT EXISTS contactGroups (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER);`
        db.run(CREATE_TABLE_CONTACTS_GROUPS, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Create table contacts_groups success');
            }
        })
    })
}
*/

replServer.context.setup = setup