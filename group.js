
'use strict'

const sqlite3 = require('sqlite3').verbose();
const file = 'addressBook.db'
const db = new sqlite3.Database(file)

class Groups {
  constructor() {

  }
  static addGroups(name) {
    let ADD_GROUP = `INSERT INTO Groups (group_name) VALUES ('${name}')`
    db.serialize(() => {
        db.run(ADD_GROUP, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("berhasil di tambah");
            }
        })
    })
    return true;
  }

  static updateGroups(name,id) {
    let UPDATE = `UPDATE Groups SET group_name = '${name}' WHERE ID = ${id};`
    db.serialize(()=>{
        db.run(UPDATE,(err)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("berhasil di update");
            }
        })
    })
    return true;
  }

  static deleteGroups(id) {
    db.serialize(()=>{
      let DLETE = `DELETE from groups where id='${id}'`
      db.run(DLETE, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("berhasil di hapus");
        }
      })
      let query = `DELETE from group_contacts where groups_id='${id}'`
      db.run(query, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("berhasil di hapus");
        }
      })
    })
  return true;
  }

  static tampilkanSemua() {
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
