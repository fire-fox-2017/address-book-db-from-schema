"use strict"

const sqlite3 = require('sqlite3').verbose();
const file = 'address_book.db'
const db = new sqlite3.Database(file)

class Groups {
  constructor() {

  }
  static addGroups(name) {
    let query = `INSERT INTO Groups (group_name) VALUES ('${name}')`
    db.serialize(() => {
        db.run(query, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Group Added");
            }
        })
    })
    return true;
  }

  static updateGroups(name,id) {
    let query = `UPDATE Groups SET group_name = '${name}' WHERE ID = ${id};`
    db.serialize(()=>{
        db.run(query,(err)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("Group Updated");
            }
        })
    })
    return true;
  }

  static deleteGroups(id) {
    db.serialize(()=>{
      let deleteGroup = `DELETE from groups where id='${id}'`
      db.run(deleteGroup, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Query Deleted");
        }
      })
      let query = `DELETE from group_contacts where group_id='${id}'`
      db.run(query, (err) => {
        if (err) {
          console.log("Id Not Defined");
        } else {
          console.log("Group Contact Deleted");
        }
      })
    })
  return true;
  }

  static viewAllGroup() {
    db.serialize(() => {
      db.all("SELECT * FROM groups", (err,data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          }
      })
    })
  return true;
  }
}

module.exports = Groups
