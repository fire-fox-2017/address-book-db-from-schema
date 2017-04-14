'use strict'

const sqlite3 = require('sqlite3').verbose()
const file = 'addressBook.db'
const db = new sqlite3.Database(file)

class Contact {
  static addContact(name,phone,email) {
    let val = /^\w+@\w+\.[a-z]{3}$/gi
    if(val.test(email) == false){
      console.log('silahkan masukan email dg benar !');
    } else if(typeof + phone == 'number' && phone.length < 17 && phone.lemgth > 8) {
      db.serialize(() => {
        let ADD_CONTACT = `INSERT INTO contacts (name,phone,email) VALUES ('${name}','${phone}','${email}')`
        db.run(ADD_CONTACT, (err) => {
          if (!err) {
            console.log('berhasil d tambah');
          } else {
            console.log(err.message);
          }
        })
      })
      return true
    } else {
      console.log("Masukkan data dengan benar !");
      return false
    }
  }
  static updateContact(name,phone,mail,id) {
    let val = /^\w+@\w+\.[a-z]{3}$/gi
    if(val.test(email) == false){
      console.log('silahkan masukan email dg benar !');
    } else if(typeof + phone == 'number' && phone.length < 17 && phone.lemgth > 8) {
      db.serialize(() => {
        let UPDATE_CONTACT =  `UPDATE Contacts SET name = '${name}', phone = '${phone}', email = '${email}' WHERE ID = ${id};`
        db.run(UPDATE_CONTACT, (err) => {
          if (!err) {
            console.log('berhasil d tambah');
          } else {
            console.log(err.message);
          }
        })
      })
      return true
    } else {
      console.log("Masukkan data dengan benar !");
      return false
    }
  }

  static deleteContacts(id) {
    db.serialize(() => {
      let DELETE_CONTACT = `DELETE FROM contacts WHERE id = ${id}`
      db.run(DELETE_CONTACT, err => {
        !err ? console.log('terhapus') : console.log(err.message);;
      })
      let DELETE_GROUP_CONTACT = `DELETE FROM group_contacts WHERE contact_id = ${id}`
      db.run(DELETE_GROUP_CONTACT, err => {
        !err ? console.log('terhapus') : console.log(err.message);;
      })
    })
  }

  static tampilkanSemua() {
    let TAMPILKAN = "SELECT contacts.*, groups.group_name as 'GROUP' FROM contacts,groups,group_contacts where group_contacts.contact_id = contacts.id and group_contacts.group_id = groups.id"
    db.serialize(() => {
      db.all(TAMPILKAN, (err, data) => {
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
