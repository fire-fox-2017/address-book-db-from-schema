"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = 'address_book.db';
var db = new sqlite.Database(file);


class GroupContact{
  constructor(obj={}){
    this.groupId = obj.groupId
    this.contactId = obj.contactId
    this.id = null;
  }

  save(){
    let obj = this;
    if(this.id == null){
      db.serialize(function(){
        db.run(`INSERT INTO groupscontacts(group_id, contact_id, is_deleted) VALUES('${obj.groupId}', '${obj.contactId}', 'false')`, function(err){
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
        db.run(`UPDATE groupscontacts SET group_id='${obj.groupId}', contact_id='${obj.contactId}' WHERE id=${obj.id}`, function(err){
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

  static create(group_id,contact_id){
    db.run(`INSERT INTO groupscontacts(group_id, contact_id, is_deleted) VALUES(${group_id}, ${contact_id}, 'false')`, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('Berhasil Insert Data');
      }
    });
  }
}

export default GroupContact