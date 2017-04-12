"use strict"
const sqlite = require('sqlite3').verbose();

var file = 'address_book.db';
var db = new sqlite.Database(file);

class Group{
  constructor(obj){
    this.name=obj.name
    this.id=null
  }
  save() {
    let id=this.id,
    name=this.name,
    obj = this;
    if(this.id===null){
      db.serialize(function(){
        db.run(`INSERT INTO groups (name) VALUES ('${name}');`,function(err){
          if(err){
            console.log(err.message)
          } else {
            console.log(`${name} inserted`)
            obj.id = this.lastID;
          }
        })
      })
    } else {
      db.serialize(function(){
        db.run(`UPDATE groups SET name = '${name}' WHERE id = ${id};`, function(err){
          if(err){
            console.log(err.message)
          } else {
            console.log(`id ${id} updated`)
          }
        })
      })
    }
  }
  static create(name){
    db.serialize(function() {
     db.run(`INSERT INTO groups (name) VALUES ('${name}');`, function(err) {
       if (err) {
         console.log(err.message);
       } else {
         console.log('GROUP ADDED');
       }
     });
   });
  }
  static update(id, attribute, value){
    db.serialize(function() {
      db.run(`UPDATE groups SET ${attribute} = '${value}' WHERE id = ${id};`, function(err) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('GROUP UPDATED');
        }
      });
    });
  }
  static delete(id){
    db.serialize(function() {
      db.run(`DELETE FROM groups WHERE id = ${id};`, function(err) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('GROUP DELETED');
        }
      });
      db.run(`DELETE FROM contacts_groups WHERE group_id = '${id}'`, function(err) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('GROUP DELETED FROM CONTACTS_GROUPS');
        }
      })
    });
  }
  static show(){
    db.each(`SELECT * FROM groups`, function(err,data){
      if (err){
        console.log(err.message)
      } else {
        console.log(data)
      }
    })
  }
}

export default Group