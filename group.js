"use strict"

const sqlite = require('sqlite3').verbose();
const file = 'address.db';
const db = new sqlite.Database(file)

class Group {
  constructor(){}
  static addGroup(name){
    let query = `INSERT INTO groups (group_name) VALUES ('${name}');`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`process sucess`)
        }else {
          console.log(`Error : ${err}`)
        }
      })
    })
    return true;
  }

  static updateGroup(id, name){
    let query = `UPDATE groups SET group_name = '${name} WHERE id = ${id}'`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`process sucess`)
        }else {
          console.log(`Error : ${err}`)
        }
      })
    })
    return true;
  }

  static deleteGroup(id){
    let query = `DELETE FROM groups WHERE id = ${id}`db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`process sucess`)
        }else {
          console.log(`Error : ${err}`)
        }
      })
    })
    return true;
  }

  static showAll(){
    db.serialize(()=>{
      db.all('SELECT * FROM groups', (err, data)=>{
        if(!err){
          console.log(data)
        }else {
          console.log(`Error : ${err}`)
        }
      })
    })
  }
}

module.exports = Group
