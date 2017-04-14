
import ContactGroup from "./contact-group.js";

const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

class Contact {
  constructor(object) {
    this.firstname = object.firstname;
    this.lastname = object.lastname || "";
    this.email = object.email || "";
    this.phone = object.phone || "";
    this.company = object.company || "";
    this.id = object.id || null;
  }

  validate(object) {
    if (this.checkFirstName(obj.firstname) && this.checkLasttName(obj.lastname) && this.checkEmail(obj.email) && this.checkPhone(obj.phone)) {
      return true;
    } else {
      return false;
    }
  }

  checkFirstName(name) {
    if (/^[a-z]+$/ig.test(name)) {
      return true;
    } else {
      console.log(`First name must contain letters only`);
      return false;
    }
  }

  checkLasttName(name) {
    if (/^[a-z]+$/ig.test(name)) {
      return true;
    } else {
      console.log(`Last name must contain letters only`);
      return false;
    }
  }

  checkEmail(email) {
    if (/^\w+@[a-z]+.[a-z]{2,3}$/ig.test(email)) {
      return true;
    } else {
      console.log(`Invalid email`);
      return false;
    }
  }

  checkPhone(phone) {
    if (/\d-\d{3}-\d{3}-\d{4}/g.test(phone)) {
      return true;
    } else {
      console.log(`Phone must be in US format of x-xxx-xxx-xxxx`);
      return false;
    }
  }

  static show() {
    let query = "select c.*, group_name from contacts c left join (select gc.*, g.group_name from group_contacts gc, groups g where gc.group_id = g.id) a on c.id = a.id order by c.id";
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
    let query = `DELETE FROM contacts WHERE id = ${id}`;
    db.serialize(() => {
      db.run(query, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`The record with id ${id} has been deleted`);
        }
      });
    });
  }

  save() {
    let obj = this;
    if (obj.id !== null) {
      db.serialize(() => {
        db.get("SELECT * from contacts order by id desc", (err, row) => {
          if (err) {
            console.log(err);
          } else {
            let id = row.id;
            let query = `UPDATE contacts SET firstname = '${obj.firstname}', lastname = '${obj.lastname}', email = '${obj.email}', phone = '${obj.phone}', company = '${obj.company}' WHERE id = ${id}`;
            db.serialize(() => {
              db.run(query, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Record with id ${id} has been updated`);
                }
              });
            });
          }
        });
      });
    } else {
      let query = `INSERT INTO contacts (firstname, lastname, email, phone, company) values ('${obj.firstname}','${obj.lastname}','${obj.email}','${obj.phone}','${obj.company}')`;
      db.serialize(() => {
        db.run(query, (err) => {
          if (err) {
            console.log(err);
          } else {
            db.serialize(() => {
              db.get("SELECT * from contacts order by id desc", (err, row) => {
                if (err) {
                  console.log(err);
                } else {
                  obj.id = row.id;
                }
              });
            });
            console.log(`A new record has been inserted into the contacts`);
          }
        });
      });
    }
  }

}










export default Contact
