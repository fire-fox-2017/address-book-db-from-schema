"use strict"

const sqlite = require('sqlite3').verbose();
const file = 'address.db';
const db = new sqlite.Database(file)

class Contacts_group {
  constructor(){

  }
  static addContactGroup(contact_id, groups_id){
    let query = `INSERT INTO contacts_group (contact_id, groups_id) VALUES ('${contact_id}','${groups_id}');`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`process sucess`)
        } else {
          console.log(`Error : ${err}`)
        }
      })
    })
  }
  static updateContactGroup(id, contact_id, groups_id){
    let query = `UPDATE contacts_group SET contact_id = '${contact_id}', groups_id = '${groups_id}' WHERE id = ${id};`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`process sucess`)
        } else {
          console.log(`Error : ${err}`)
        }
      })
    })
  }
  static DeleteContactGroup(id){
    let query = `DELETE FROM contacts_group WHERE id = ${id};`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`process sucess`)
        } else {
          console.log(`Error : ${err}`)
        }
      })
    })
  }
  static showAllContactGroup(contact_id, groups_id){
    let query = `SELECT * FROM contacts_group;`
    db.serialize(()=>{
      db.all(query, (err, data)=>{
        if(!err){
          console.log(data)
        } else {
          console.log(`Error : ${err}`)
        }
      })
    })
  }
}

module.exports = Contacts_group;
