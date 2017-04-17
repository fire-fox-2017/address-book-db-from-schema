"use strict"

const sqlite3 = require('sqlite3').verbose()
const file = 'address_book.db'
const db = new sqlite3.Database(file)

class Contact {
  static addContact(first_name,last_name,phone,email) {
      db.serialize(() => {
        let query = `INSERT INTO contacts (first_name,last_name,phone,email) VALUES ('${first_name}','${last_name}','${phone}','${email}')`
        db.run(query, (err) => {
          if (!err) {
            console.log('Contact Added');
          } else {
            console.log(err.message);
          }
        })
      })
      return true
    }
  static updateContact(first_name,last_name,phone,mail,id) {
      db.serialize(() => {
        let query =  `UPDATE Contacts SET first_name = '${first_name}',last_name='${last_name}', phone = '${phone}', email = '${email}' WHERE ID = ${id};`
        db.run(query, (err) => {
          if (!err) {
            console.log('Query Updated');
          } else {
            console.log(err.message);
          }
        })
      })
      return true
    }

  static deleteContacts(id) {
    db.serialize(() => {
      let deleteContact = `DELETE FROM contacts WHERE id = ${id}`
      db.run(deleteContact, err => {
        !err ? console.log('Data Contact Deleted') : console.log(err.message);;
      })
      let deleteGroupContact = `DELETE FROM group_contacts WHERE contact_id = ${id}`
      db.run(deleteGroupContact, err => {
        !err ? console.log('Data Group Deleted') : console.log(err.message);;
      })
    })
  }

  static viewAllContact() {
    let query = "SELECT contacts.*, groups.group_name as 'GROUP' FROM contacts,groups,group_contacts where group_contacts.contact_id = contacts.id and group_contacts.group_id = groups.id"
    db.serialize(() => {
      db.all(query, (err, data) => {
        if (!err) {
          console.log(data);
        } else {
          console.log(err.message);
        }
      })
    })
  }
}

module.exports = Contact
