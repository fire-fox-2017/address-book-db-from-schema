'use strict'

const sqlite3 = require('sqlite3').verbose();
const file = 'address.db'
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
                console.log("INSERT GROUP SUCCESS");
            }
        })
    })
    return true;
  }

  static updateGroups(id,name) {
    let query = `UPDATE Groups SET group_name = '${name}' WHERE ID = ${id};`
    db.serialize(()=>{
        db.run(query,(err)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("UPDATE GROUP SUCCESS");
            }
        })
    })
    return true;
  }

  static deleteGroups(id) {
    db.serialize(()=>{
      let query = `DELETE from groups where id='${id}'`
        db.run(query, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("DELETE GROUP SUCCESS");
            }
        })
    })
    db.serialize(()=>{
      let query = `DELETE from contacts_groups where group_id='${id}'`
        db.run(query, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("DELETE CONTACT_GROUP SUCCESS");
            }
        })
    })
  return true;
  }

  static showAll() {
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
