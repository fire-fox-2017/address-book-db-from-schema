"use strict"
const sqlite = require('sqlite3').verbose();

var file = 'address_book.db';
var db = new sqlite.Database(file);

class Contact {
  constructor(obj) {
    this.name = obj.name
    this.company = obj.company || null
    this.phone_number = obj.phone_number || null
    this.email = obj.email || null
    this.id = null
  }
  save() {
    let id = this.id,
    name = this.name,
    company = this.company,
    phone_number = this.phone_number,
    email = this.email,
    obj = this;
    if(Contact.emailValidation(email) || email===null){
      if(Contact.phoneValidation(phone_number) || phone_number === null){
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
      } else {
        console.log("phone number is not valid")
      }
    } else {
      console.log("email is not valid")
    }
    
  }
  static create(name, company, phone_number, email){
    if(Contact.emailValidation(email)){
      if(Contact.phoneValidation(phone_number)){
        db.serialize(function() {
          db.run(`INSERT INTO contacts (name, company, phone_number, email) VALUES ('${name}', '${company}', '${phone_number}', '${email}');`, function(err) {
            if (err) {
              console.log(err.message);
            } else {
              console.log('CONTACT ADDED');
            }
          });
        });
      } else {
        console.log("phone number is not valid")
      }
    } else {
      console.log("email is not valid")
    }
  }
  static update(id, attribute, value){
    if(attribute === "email"){
      if(Contact.emailValidation(value)){
        db.serialize(function() {
          db.run(`UPDATE contacts SET ${attribute} = '${value}' WHERE id = ${id};`, function(err) {
            if (err) {
              console.log(err.message);
            } else {
              console.log('CONTACT UPDATED');
            }
          });
        });
      } else {
        console.log("email is not valid!");
      }
    }
    if(attribute === "phone_number"){
      if(Contact.phoneValidation(value)){
        db.serialize(function() {
          db.run(`UPDATE contacts SET ${attribute} = '${value}' WHERE id = ${id};`, function(err) {
            if (err) {
              console.log(err.message);
            } else {
              console.log('CONTACT UPDATED');
            }
          });
        });
      } else {
        console.log("phone is not valid!");
      }
    } 
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
  static emailValidation(email){
    let emailregex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    return emailregex.test(email)
  }
  static phoneValidation(phone_number){
    if(phone_number.length < 17){
     return true  
    }
  }
}

export default Contact;