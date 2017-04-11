"use strict"
const sqlite = require('sqlite3').verbose();

var file = 'address_book.db';
var db = new sqlite.Database(file);

class Contact {
  constructor(obj) {
    this.name = obj.name
    this.company = obj.company
    this.phone_number = obj.phone_number
    this.email = obj.email
    this.id = null
  }
  save() {
    let id = this.id,
    name = this.name,
    company = this.company,
    phone_number = this.phone_number,
    email = this.email,
    obj = this;
    if(id===null){
      db.serialize(function(){
        db.run(`INSERT INTO contacts (name, company, phone_number, email) VALUES ('${name}', '${company}', '${phone_number}', '${email}');`,function(err){
          if(err){
            console.log(err.message)
          } else {
            obj.id = this.lastID
            console.log(`${name} inserted`)
          }
        })
      })
    } else {
      db.serialize(function(){
        db.run(`UPDATE contacts SET name = '${name}', company = '${company}', phone_number = '${phone_number}', email = '${email}' WHERE id = ${id};`, function(err){
          if(err){
            console.log(err.message)
          } else {
            console.log(`id ${id} updated`)
          }
        })
      })
    }
  }
  static create(name, company, phone_number, email){
    db.serialize(function() {
     db.run(`INSERT INTO contacts (name, company, phone_number, email) VALUES ('${name}', '${company}', '${phone_number}', '${email}');`, function(err) {
       if (err) {
         console.log(err.message);
       } else {
         console.log('CONTACT ADDED');
       }
     });
   });
  }
  static update(id, attribute, value){
    db.serialize(function() {
      db.run(`UPDATE contacts SET ${attribute} = '${value}' WHERE id = ${id};`, function(err) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('CONTACT UPDATED');
        }
      });
    });
  }
  static delete(id){
    db.serialize(function() {
      db.run(`DELETE FROM contacts WHERE id = ${id};`, function(err) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('CONTACT DELETED');
        }
      });
      db.run(`DELETE FROM contacts_groups WHERE contact_id = '${id}'`, function(err) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('CONTACT DELETED FROM CONTACTS_GROUPS');
        }
      })
    });
  }
  static show(){
    db.all(`SELECT 
      contacts.id as contact_id, 
      contacts.name as contact_name, 
      contacts.company,
      contacts.phone_number,
      contacts.email,
      groups.id as group_id,
      groups.name as groups_name
      FROM contacts
      LEFT JOIN contacts_groups on (contacts.id = contacts_groups.contact_id)
      LEFT JOIN groups on (contacts_groups.group_id = groups.id); `,function(err,data){
        if(err){
          console.log(err.message)
        } else {
          console.log(data)
        }
      })
  }
  
}

export default Contact;