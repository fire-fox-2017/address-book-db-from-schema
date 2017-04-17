'use strict'

const sqlite3 = require('sqlite3').verbose();
const file = 'address.db'
const db = new sqlite3.Database(file)

class Contacts {
  static addContact(name,company,phone,email){
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(pattern.test(email) == false){
      console.log('email yg anda masukkan salah');
      return false
    } else if(typeof +phone == 'number' && phone.length < 17 && phone.length > 8){
      db.serialize(()=>{
        db.run(`INSERT INTO Contacts (name, company, phone, email) VALUES ('${name}','${company}','${phone}','${email}');`, (err)=>{
          if (err) {
            console.log(err);
          } else {
            console.log('Data added');
          }
        })
      })
      return true
    } else {
      console.log("nomer telp yg anda masukkan salah");
      return false
    }
  }

  static updateContact(id,name,company,phone,email){
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(pattern.test(email) == false){
      console.log('email yg anda masukkan salah');
      return false
    } else if(typeof +phone == 'number' && phone.length < 17 && phone.length > 8){
      db.serialize(()=>{
        db.run(`UPDATE Contacts SET name = '${name}', company = '${company}', phone = '${phone}', email = '${email}' WHERE ID = ${id};`, (err)=>{
          if (err) {
            console.log(err);
          } else {
            console.log('Data updated');
          }
        })
      })
      return true
    } else {
      console.log("nomer telp yg anda masukkan salah");
      return false
    }
  }

  static deleteContact(id){
    db.serialize(()=>{
      db.run(`DELETE FROM Contacts WHERE ID = ${id};`, (err)=>{
        if(err){
          console.log(err);
        } else {
          console.log('Data deleted');
        }
      })
    })
    db.serialize(()=>{
      db.run(`DELETE FROM contacts_groups WHERE contacts_id='${id}'`, (err)=>{
        if(err){
          console.log(err);
        } else {
          console.log('Data deleted');
        }
      })
    })
  }

  static showContact(){
        db.all("SELECT Contacts.*, Groups.group_name as 'Group' FROM Contacts,Groups,Contacts_Groups where Contacts_Groups.contact_id = Contacts.id and Contacts_Groups.group_id = Groups.id", (err, data) => {
          console.log(data);
        })
  }
}

export default Contacts
