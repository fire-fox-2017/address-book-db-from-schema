
import ContactGroup from "./contact-group.js";

const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

class Group {
  constructor(object) {
    this.group_name = object.group_name;
    this.id = object.id || null;
  }

  static validate(obj) {
    if (obj.group_name) {
      if (Group.checkName(obj.firstname)) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("Group name must not be empty");
    }
  }

  static checkName(name) {
    if (/^[a-z]+$/ig.test(name) || name === null) {
      return true;
    } else {
      console.log(`Group name must contain letters only`);
      return false;
    }
  }

  static show() {
    let query = "SELECT * FROM groups";
    db.serialize(() => {
      db.each(query, (err, row) => {
        if (err) {
          console.log(err);
        } else {
          console.log(JSON.stringify(row));
        }
      });
    });
  }

  static delete(id) {
    let query = `DELETE FROM groups WHERE id = ${id}`;
    db.serialize(() => {
      db.run(query, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`The record with id ${id} has been deleted from 'groups'`);
        }
      });
    });
  }

  save() {
    let obj = this;
    if (obj.id !== null && Group.validate(obj)) {
      db.serialize(() => {
        db.get("SELECT * FROM groups ORDER BY id DESC", (err, row) => {
          if (err) {
            console.log(err);
          } else {
            let id = row.id;
            let query = `UPDATE groups SET group_name = '${obj.group_name}'`;
            db.serialize(() => {
              db.run(query, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Record with id ${id} from 'groups' has been updated`);
                }
              });
            });
          }
        });
      });
    } else if (obj.id === null && Group.validate(obj)){
      let query = `INSERT INTO groups (group_name) values ('${obj.group_name}')`;
      db.serialize(() => {
        db.run(query, (err) => {
          if (err) {
            console.log(err);
          } else {
            db.serialize(() => {
              db.get("SELECT * FROM groups ORDER BY id DESC", (err, row) => {
                if (err) {
                  console.log(err);
                } else {
                  obj.id = row.id;
                }
              });
            });
            console.log(`A new record has been inserted into the 'groups'`);
          }
        });
      });
    }
  }

  static update(id, obj) {
    let update = {};
    update.group_name = obj.group_name;
    if (Group.validate(update)) {
      db.serialize(() => {
        db.get(`SELECT * FROM groups WHERE id = ${id}`, (err, row) => {
          if (err) {
            console.log(err);
          } else {
            let foundObj = row;
            foundObj.group_name = obj.group_name;
            let query = `UPDATE groups SET group_name = '${foundObj.group_name}' WHERE id = ${id}`;
            db.serialize(() => {
              db.run(query, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Record with id ${id} from 'groups' has been updated`);
                }
              });
            });
          }
        });
      });
    }
  }

  static members(id) {
    let query = `select group_id, group_name, c.* from (select gc.*, group_name from group_contacts gc left join groups on gc.group_id = groups.id where gc.group_id = ${id}) a left join contacts c on a.contact_id = c.id`;
    db.serialize(() => {
      db.all(query, (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          rows.forEach((row) => {
            console.log(JSON.stringify(row));
          });
        }
      });
    });
  }

}


export default Group
