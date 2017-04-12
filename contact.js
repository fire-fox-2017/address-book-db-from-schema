const sqlite = require('sqlite3').verbose();

let file = 'address_book.db';
var db = new sqlite.Database(file);


class Contact{
  constructor(obj={}){
    this.name = obj.name
    this.company = obj.company
    this.phone = obj.phone
    this.email = obj.email
    this.id = null;
  }

  save(){
    let obj = this;
    if(this.id == null) {
      db.serialize(function() {
        db.run(`INSERT INTO contacts(name, company, phone, email) VALUES('${obj.name}', '${obj.company}', '${obj.phone}', '${obj.email}')`, function(err) {
          if(err) {
            console.log(err);
          }
          else {
            obj.id = this.lastID
            console.log("Data berhasil Dimasukkan")
          }
        });
      });
    }
    else {
      db.serialize(function() {
        db.run(`UPDATE contacts SET name='${obj.name}', company='${obj.company}', phone='${obj.phone}', email='${obj.email}' WHERE id=${obj.id}`, function(err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log('Data Berhasil Diupdate');
          }
        });
      });
    }
  }

  static validatePhone(phone){
    if(phone.length >=10 && phone.length<=13)
      return true
    else
      return false
  }

  static validateEmail(email){
    let a = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (a.test(email))
      return true;
    else
      false;
  }

  static add (name, company, phone, email) {
    let validatePhone = Contact.validatePhone(phone);
    let validateEmail = Contact.validateEmail(email);
    if(validatePhone === true && validateEmail === true) {
      db.run(`INSERT INTO contacts(name, company, phone, email) VALUES('${name}', '${company}', '${phone}', '${email}')`, function(err) {
        if(err) {
          console.log(err);
        }
        else {
          console.log('Berhasil Insert');
        }
      });
    }
    else if (!validatePhone) {
      console.log('Phone tidak valid');
    }
    else {
      console.log('Email tidak valid');
    }

  }

  static update (id, colom, value) {
    db.run(`UPDATE contacts SET ${colom}='${value}' WHERE id=${id}`, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log('Berhasil Update');
      }
    });
  }

  static delete(id) {
    db.serialize(function() {
      db.run(`DELETE FROM contacts WHERE id=${id}`, function(err) {
        if(err) {
          console.log(err);
        }
        else {
          console.log('Berhasil Delete Contact');
        }
      });

      db.run(`UPDATE groupscontacts SET is_deleted='true' WHERE contact_id=${id}`, function(err) {
        if(err) {
          console.log(err);
        }
        else {
          console.log('Berhasil Update GroupsContacts');
        }
      });
    })
  }

  static show(id) {
    db.serialize(function() {
      db.each(`SELECT * FROM contacts where id=${id}`, function(err, row) {
        if(err) {
          console.log(err);
        }
        else {
          console.log(row);
        }
      });

      db.each(`SELECT * FROM contacts_groups where contact_id=${id} AND is_deleted='false'`, function(err, row) {
        if(err) {
          console.log(err);
        }
        else {
          db.each(`SELECT group_name FROM groups where id=${row.group_id}`, function(err, row) {
            if(err) {
              console.log(err);
            }
            else {
              console.log(row.group_name);
            }
          });
        }
      });
    })
  }

}

module.exports = Contact