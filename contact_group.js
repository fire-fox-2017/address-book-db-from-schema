'use strict'

const sqlite3 = require('sqlite3').verbose();
const file = 'address.db'
const db = new sqlite3.Database(file)

class Contacts_groups {
  constructor() {

  }
  static addContacts_groups(contacts_id,groups_id){
    let query = `INSERT INTO Contacts_Groups (contact_id, group_id) VALUES ('${contacts_id}','${groups_id}')`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('SUCESS');
        }
      })
    })
    return true
  }
  static updateContacts_groups(id, contact_id, group_id){
    let query = `UPDATE Contacts_Groups SET contact_id = '${contact_id}', group_id = '${group_id}' WHERE ID = ${id};`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('SUCESS');
        }
      })
    })
    return true
  }
  static deleteContacts_groups(id){
    let query1 = `DELETE FROM Contacts_Groups WHERE ID = ${id};`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('SUCESS');
        }
      })
    })
    return true
  }

  static showAll(){
    let query = `SELECT * FROM Groups`
    db.serialize(()=>{
      db.all(query, (err, data)=>{
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      })
    })
  }
}

module.exports = Contacts_groups