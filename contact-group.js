"use strict"
const repl = require('repl')
const sqlite = require('sqlite3').verbose();

var file = 'address_book.db';
var db = new sqlite.Database(file);

class ContactGroup {
  constructor(obj){
    this.id = null;
    this.contact_id = obj.contact_id;
    this.group_id = obj.group_id;
  }
  save(){
    let id = this.id,
    group_id = this.group_id,
    contact_id = this.contact_id,
    obj = this;
    if(id===null){
      db.serialize(function(){
        db.run(`INSERT INTO contacts_groups (contact_id, group_id) VALUES ('${contact_id}', '${group_id}');`,function(err){
          if(err){
            console.log(err.message)
          } else {
            obj.id = this.lastID
            console.log(`contact group inserted`)
          }
        })
      })
    } else {
      db.serialize(function(){
        db.run(`UPDATE contacts_groups SET contact_name = '${name}', company = '${company}', phone_number = '${phone_number}', email = '${email}' WHERE id = ${id};`, function(err){
          if(err){
            console.log(err.message)
          } else {
            console.log(`id ${id} updated`)
          }
        })
      })
    }
  }
  static assign(contact_id, group_id){
    db.serialize(function(){
      db.run(`INSERT INTO contacts_groups (contact_id, group_id) VALUES (${contact_id}, ${group_id});`,function(err){
        if(err){
          console.log(err.message)
        } else {
          console.log(`contact group inserted`)
        }
      })
    })
  }
}

export default ContactGroup
