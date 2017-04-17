'use strict'

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('address_book.db')

class Group{
  constructor(){
  }
  static addGroup(group_name){
      db.serialize(() =>{
        let query = `INSERT INTO groups (group_name) VALUES ('${group_name}')`;
        db.run(query, (err)=>{
          if (err){
            console.log(err);
          }else{
            console.log('Insert Group Name Success');
          }
        })
      })
      return true;
  }

  static updateGroup(id, group_name){
      db.serialize(() =>{
        let query = `UPDATE groups SET group_name = '${group_name}' WHERE ID ='${id}'`;
        db.run(query, (err)=>{
          if (err){
            console.log(err);
          }else{
            console.log('Update group_name Success');
          }
        })
      })
      return true;
  }

  static deleteGroupId(id){
    db.serialize(() =>{
      let query = `DELETE from groups WHERE ID = '${id}'`;
      db.run(query, (err)=>{
        if(err){
          console.log(err);
        }else{
          console.log(`Delete from groups WHERE ID '${id}'`);
        }
      })
    })
    db.serialize(()=>{
      let query = `DELETE from contact_groups WHERE group_id = '${id}'`;
      db.run(query, (err)=>{
        if(err){
          console.log(err);
        }else{
          console.log(`Delete from contact_groups WHERE group_id '${id}'`);
        }
      })
    })
  }

  static showAll(){
    let query = "SELECT * FROM groups"
    db.serialize(()=>{
      db.all(query, (err, data)=>{
        if(err){
          console.log(err);
        }else{
          console.log(data);
        }
      })
    })
    return true;
  }
}

module.exports = Group
