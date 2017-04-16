'use strict'

const sqlite3 = require('sqlite3').verbose();
const file = 'address.db'
const db = new sqlite3.Database(file)

class Contact {
  static addContact(name,company,phone,email){
    let regex = /^\w+@\w+\.[a-z]{3}$/gi
    if(regex.test(email) == false){
      console.log('Format Email Salah');
      return false
    } else if(typeof +phone == 'number' && phone.length < 17 && phone.length > 8){
      db.serialize(()=>{
        let query = `INSERT INTO Contacts (name, company, phone, email) VALUES ('${name}','${company}','${phone}','${email}')`
        db.run(query, (err)=>{
          if (err) {
            console.log(err);
          } else {
            console.log('INSERT CONTACT SUCCESS');
          }
        })
      })
      return true
    } else {
      console.log("Masukkan phone_number dengan benar ");
      return false
    }
  }

  static updateContacts(id,name,company,phone,email){
    let regex = /^\w+@\w+\.[a-z]{3}$/gi
    if(regex.test(email) == false){
      console.log('Format Email Salah');
      return false
    } else if(typeof +phone == 'number' && phone.length < 17 && phone.length > 8){
      db.serialize(()=>{
        let query = `UPDATE Contacts SET name = '${name}', company = '${company}', phone = '${phone}', email = '${email}' WHERE ID = ${id};`
        db.run(query, (err)=>{
          if (err) {
            console.log(err);
          } else {
            console.log('UPDATE CONTACT SUCCESS');
          }
        })
      })
      return true
    } else {
      console.log("Masukkan phone_number dengan benar ");
      return false
    }
  }

  static deleteContacts(id){
    // let query2 = `DELETE FROM Student WHERE ID = ${id};`
    db.serialize(()=>{
      let query = `DELETE FROM Contacts WHERE ID = ${id};`
      db.run(query, (err)=>{
        if(err){
          console.log(err);
        } else {
          console.log('DELETE CONTACT SUCCESS');
        }
      })
    })
    db.serialize(()=>{
      let query = `DELETE from contacts_groups where contact_id='${id}'`
      db.run(query, (err)=>{
        if(err){
          console.log(err);
        } else {
          console.log('DELETE CONTACT_GROUP SUCCESS');
        }
      })
    })
  }

  static showAll(){
    let query = "SELECT Contacts.*, Groups.group_name as 'Group' FROM Contacts LEFT JOIN Contacts_Groups ON Contacts_Groups.contact_id = Contacts.id LEFT JOIN Groups ON Contacts_Groups.group_id = Groups.id"
    db.all(query, (err, data) => {
      console.log(data);
    })
  }
}

module.exports = Contact
