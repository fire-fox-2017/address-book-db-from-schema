
import Contact from "./contact.js";
import Group from "./group.js";

const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

class ContactGroup {
  constructor(obj) {
    this.group_id = obj.group_id || null;
    this.contact_id = obj.contact_id || null;
    this.id = obj.id || null;
  }

  static show() {
    let query = `select gc.id, group_id, group_name, c.* from (select a.id, a.group_id, g.group_name, a.contact_id from groups g join group_contacts a on g.id = a.group_id) gc join contacts c on gc.contact_id = c.id`;
    db.serialize(() => {
      db.all(query, (err, rows) => {
        if(err) {
          console.log(err);
        } else {
          rows.forEach((row) => {
            console.log(JSON.stringify(row));
          });
        }
      });
    });
  }

  save() {
    let obj = this;
    if (obj.id !== null) {
      db.serialize(() => {
        db.get("SELECT * FROM group_contacts ORDER BY id DESC", (err, row) => {
          if (err) {
            console.log(err);
          } else {
            let id = row.id;
            let query = `UPDATE group_contacts SET group_id = '${obj.group_id}', contact_id = ${obj.contact_id}`;
            db.serialize(() => {
              db.run(query, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Record with id ${id} from 'group_contacts' has been updated`);
                }
              });
            });
          }
        });
      });
    } else if (obj.id === null){
      let query = `INSERT INTO group_contacts (group_id, contact_id) values ('${obj.group_id}', '${obj.contact_id}')`;
      db.serialize(() => {
        db.run(query, (err) => {
          if (err) {
            console.log(err);
          } else {
            db.serialize(() => {
              db.get("SELECT * FROM group_contacts ORDER BY id DESC", (err, row) => {
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



}

export default ContactGroup
