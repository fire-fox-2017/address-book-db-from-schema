'use strict'

const sqlite3 = require('sqlite3').verbose();
const file = 'address.db'
const db = new sqlite3.Database(file)

class Groups {
  constructor() {

  }
  static addGroup(name) {
    db.serialize(() => {
        db.run(`INSERT INTO Groups (group_name) VALUES ('${name}');`, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Data added");
            }
        })
    })
    return true;
  }

  static updateGroup(id,name) {
    db.serialize(()=>{
        db.run(`UPDATE Groups SET group_name = '${name}' WHERE ID = ${id};`,(err)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("Data updated");
            }
        })
    })
    return true;
  }

  static deleteGroup(id) {
    db.serialize(()=>{
        db.run(`DELETE FROM Groups WHERE id='${id}'`, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Data deleted");
            }
        })
    })
    db.serialize(()=>{
        db.run(`DELETE FROM Contacts_Groups WHERE groups_id='${id}'`, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Data deleted");
            }
        })
    })
  return true;
  }

  static showGroup() {
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

export default Groups
