"use strict"

const sqlite = require('sqlite3').verbose();
const file = 'address.db';
const db = new sqlite.Database(file)

class Contact{
  constructor(){}
  static addContact(name, company, phone, email){
    let pattern = /^\w+@\w+\.[a-z][3]$/gi
    if(pattern.test(email)==false){
      console.log(`Wrong email format`)
      return false
    }else if (typeof +phone == 'number' && phone.length<17 && phone.length>8){
      db.serialize(()=>{
        let query = `INSERT INTO contacts (name, company, phone, email) VALUES ('${name}','${company}','${phone}','${email}');`
        db.run(query, (err)=>{
          if(!err){
            console.log(`process sucess`)
          } else {
            console.log(`Error : ${err}`)
          }
        })
      })
      return true;
    }else {
      console.log(`Please insert valid number of your phone`)
      return false;
    }
  }

  static updateContact(name, company, phone, email){
    let pattern = /^\w+@\w+\.[a-z][3]$/gi
    if(pattern.test(email)==false){
      console.log(`Wrong email format`)
      return false
    }else if (typeof +phone == 'number' && phone.length<17 && phone.length>8){
      db.serialize(()=>{
        let query = `UPDATE INTO contact SET name = '${name}', company = '${company}', phone = '${phone}, email = '${email}' WHERE id = ${id};`
        db.run(query, (err)=>{
          if(!err){
            console.log(`process sucess`)
          } else {
            console.log(`Error : ${err}`)
          }
        })
      })
      return true;
    }else {
      console.log(`Please insert valid number of your phone`)
      return false;
    }
  }

  static deleteContact(id){
      db.serialize(()=>{
        let query = `DELETE FROM contact WHERE id = ${id};`
        db.run(query, (err)=>{
          if(!err){
            console.log(`process sucess`)
          } else {
            console.log(`Error : ${err}`)
          }
        })
      })
  }

  static showAll(){
    db.serialize(()=>{
      let query = `SELECT * FROM contact;`
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

module.exports = Contact
