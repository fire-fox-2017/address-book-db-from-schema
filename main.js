"use strict"

const fs = require('fs')
const sqlite = require('sqlite3').verbose()
const file = 'address_book.db'
const db = new sqlite.Database(file)
const repl = require('repl')
let replServer = repl.start({
    prompt: '> '
})

import Contact from "./contact.js"
import Group from "./group.js"
import ContactGroup from "./contact-group.js"

let fileContactsJSON = 'contacts.json'
let contactsData = fs.readFileSync(fileContactsJSON).toString()
let contactsJSON = JSON.parse(contactsData)

let fileGroupsJSON = 'groups.json'
let groupsData = fs.readFileSync(fileGroupsJSON).toString()
let groupJSON = JSON.parse(groupsData)

let seed_data = () => {
    db.serialize(() => {
        for (let i = 0; i < contactsJSON.length; i++) {
            let SEED_CONTACTS = `INSERT INTO contacts (name, company, phone, email) VALUES ('${contactsJSON[i].name}', '${contactsJSON[i].company}', '${contactsJSON[i].phone}', '${contactsJSON[i].email}');`
            db.run(SEED_CONTACTS, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Insert ${contactsJSON[i].name}, ${contactsJSON[i].company}, ${contactsJSON[i].phone}, ${contactsJSON[i].email} is success`);
                }
            })
        }

        for (let i = 0; i < groupJSON.length; i++) {
            let SEED_GROUPS = `INSERT INTO groups (name) VALUES ('${groupJSON[i].name}');`
            db.run(SEED_GROUPS, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Insert ${groupJSON[i].name} is success`);
                }
            })
        }
    })
}

replServer.context.seed_data = seed_data
replServer.context.Contact = Contact
replServer.context.Group = Group
replServer.context.ContactGroup = ContactGroup