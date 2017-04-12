const sqlite = require('sqlite3').verbose();

let file = 'address_book.db';
var db = new sqlite.Database(file);


class Group{
  constructor(obj={}){
    this.groupName = obj.groupName
    this.id = null;
  }

  save(){
    let obj = this;
    if(this.id == null){
      db.serialize(function(){
        db.run(`INSERT INTO groups(group_name) VALUES('${obj.groupName}')`, function(err){
          if(err){
            console.log(err);
          }
          else{
            obj.id = this.lastID
            console.log("Data berhasil Dimasukkan")
          }
        });
      });
    }
    else{
      db.serialize(function(){
        db.run(`UPDATE groups SET group_name='${obj.groupName}' WHERE id=${obj.id}`, function(err){
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

  //
  static create(group_name){
    db.run(`INSERT INTO groups(group_name) VALUES('${group_name}')`, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('Berhasil Insert Data');
      }
    });
  }

  static update(id, value){
    db.run(`UPDATE groups SET group_name='${value}' WHERE id=${id}`, function(err){
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
      db.run(`DELETE FROM groups WHERE id=${id}`, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('Berhasil Delete Contact');
          db.run(`UPDATE groupscontacts SET is_deleted='true' WHERE group_id=${id}`, function(err){
            if(err){
              console.log(err);
            }
            else{
              console.log('Berhasil Update GroupsContacts');
            }
          });
        }
      });


    })
  }

  static show(id){
    db.serialize(function(){
      db.each(`SELECT * FROM groups where id=${id}`, function(err, row){
        if(err){
          console.log(err);
        }
        else{
          console.log(row);
        }
      });

      db.each(`SELECT * FROM groupscontacts where group_id=${id} AND is_deleted='false'`, function(err, row){
        if(err){
          console.log(err);
        }
        else{
          db.each(`SELECT name FROM contacts where id=${row.contact_id}`, function(err, row){
            if(err){
              console.log(err);
            }
            else{
              console.log(row.name);
            }
          });
        }
      });
    })
  }
}

export default Group