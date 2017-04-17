'use strict'

const sqlite3 = require('sqlite3').verbose();
const file = 'address_book.db'
const db = new sqlite3.Database(file)

class Group_contacts {
  constructor() {

  }
  static addgroup_contacts(contacts_id,groups_id){
    let query = `INSERT INTO group_contacts (contact_id, group_id) VALUES ('${contacts_id}','${groups_id}')`
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
  static updategroup_contacts(id, contact_id, group_id){
    let query = `UPDATE group_contacts SET contact_id = '${contact_id}', group_id = '${group_id}' WHERE id = ${id};`
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
  static deletegroup_contacts(id){
    let query1 = `DELETE FROM group_contacts WHERE id = ${id};`
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

module.exports = Group_contacts
