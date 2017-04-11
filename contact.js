const sqlite = require('sqlite3').verbose();

let file = 'address_book.db';
var db = new sqlite.Database(file);


class Contact{
  constructor(obj={}){
    this.name = obj.name
    this.company = obj.company
    this.phone = obj.phone
    this.id = null;
  }

  save(){
    let obj = this;
    if(this.id == null){
      db.serialize(function(){
        db.run(`INSERT INTO contacts(name, company, phone) VALUES('${obj.name}', '${obj.company}', '${obj.phone}')`, function(err){
          if(err){
            console.log(err);
          }
          else{
            obj.id = this.lastID
          }
        });
      });
    }
    else{
      db.serialize(function(){
        db.run(`UPDATE contacts SET name='${obj.name}', company='${obj.company}', phone='${obj.phone}' WHERE id=${obj.id}`, function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log('Data Berhasil Diupdate');
          }
        });
      });
    }
  }


  static create(name, company, phone){
    db.run(`INSERT INTO contacts(name, company, phone) VALUES('${name}', '${company}', '${phone}')`, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('Berhasil Insert');
      }
    });
  }

  static update(id, colom, value){
    db.run(`UPDATE contacts SET ${colom}='${value}' WHERE id=${id}`, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('Berhasil Update');
      }
    });
  }

  static delete(id){
    db.serialize(function(){
      db.run(`DELETE FROM contacts WHERE id=${id}`, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('Berhasil Delete Contact');
        }
      });

      db.run(`UPDATE groupscontacts SET is_deleted='true' WHERE contact_id=${id}`, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('Berhasil Update GroupsContacts');
        }
      });
    })
  }

  static show(id){
    db.serialize(function(){
      db.each(`SELECT * FROM contacts where id=${id}`, function(err, row){
        if(err){
          console.log(err);
        }
        else{
          console.log(row);
        }
      });

      db.each(`SELECT * FROM groupscontacts where contact_id=${id} AND is_deleted='false'`, function(err, row){
        if(err){
          console.log(err);
        }
        else{
          db.each(`SELECT group_name FROM groups where id=${row.group_id}`, function(err, row){
            if(err){
              console.log(err);
            }
            else{
              console.log(row.group_name);
            }
          });
        }
      });
    })
  }




}

export default Contact