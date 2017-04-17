'use strict'

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('address_book.db');

class Contact{

  static addContact(name, company, phone_number, email){
    let stdr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if(stdr.test(email) == false){
      console.log("Format Email Salah")
      return false;
    }else if(typeof +phone_number == 'number' && phone_number.length < 17 && phone_number.length > 8){
      db.serialize(() =>{
        let query = `INSERT INTO contacts (name, company, phone_number, email) VALUES ('${name}', '${company}', '${phone_number}', '${email}')`;
        db.run(query, (err)=>{
          if (err){
            console.log(err);
          }else{
            console.log('Insert Contact Success');
          }
        })
      })
      return true;
    }else{
      console.log('Masukan kembali phone_number dengan format yang benar');
      return false;
    }
  }

  static updateContact(id, name, company, phone_number, email){
    let stdr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if(stdr.test(email) == false){
      console.log("Format Email Salah")
      return false;
    }else if(typeof +phone_number == 'number' && phone_number.length < 17 && phone_number.length > 8){
      db.serialize(() =>{
        let query = `UPDATE contacts SET name = '${name}', company = '${company}', phone_number = '${phone_number}', email = '${email}' WHERE ID ='${id}'`;
        db.run(query, (err)=>{
          if (err){
            console.log(err);
          }else{
            console.log('Update Contact Success');
          }
        })
      })
      return true;
    }else{
      console.log('Masukan kembali phone_number dengan format yang benar');
      return false;
    }
  }

  static deleteContact(id){
    db.serialize(() =>{
      let query = `DELETE from contacts WHERE ID = '${id}'`;
      db.run(query, (err)=>{
        if(err){
          console.log(err);
        }else{
          console.log(`Delete from contacts WHERE ID '${id}'`);
        }
      })
    })
    db.serialize(()=>{
      let query = `DELETE from contact_groups WHERE contact_id = '${id}'`;
      db.run(query, (err)=>{
        if(err){
          console.log(err);
        }else{
          console.log(`Delete from contact_groups WHERE contact_id '${id}'`);
        }
      })
    })
  }

  static showAll(){
    let query = "SELECT * FROM contacts"

    db.all(query, (err, data)=>{
      console.log(data);
    })
  }

  static read(){
    console.log('Read Success');
    return 'Read Success';
  }
}

let contact = new Contact();



module.exports = Contact
