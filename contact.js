
import ContactGroup from "./contact-group.js";

const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

class Contact {
  constructor(object) {
    this.firstname = object.firstname;
    this.lastname = object.lastname || null;
    this.email = object.email || null;
    this.phone = object.phone || null;
    this.company = object.company || null;
    this.id = object.id || null;
  }

  static validate(obj) {
    if (obj.firstname !== null) {
      if (Contact.checkFirstName(obj.firstname) && Contact.checkLastName(obj.lastname) && Contact.checkEmail(obj.email) && Contact.checkPhone(obj.phone)) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("Firstname must not be empty");
    }
  }

  static validateUpdate(obj) {
    if (Contact.checkFirstName(obj.firstname) && Contact.checkLastName(obj.lastname) && Contact.checkEmail(obj.email) && Contact.checkPhone(obj.phone)) {
      return true;
    } else {
      return false;
    }
  }

  static checkFirstName(name) {
    if (/^[a-z]+$/ig.test(name) || name === null) {
      return true;
    } else {
      console.log(`First name must contain letters only`);
      return false;
    }
  }

  static checkLastName(name) {
    if (/^[a-z]+$/ig.test(name) || name === null) {
      return true;
    } else {
      console.log(`Last name must contain letters only`);
      return false;
    }
  }

  static checkEmail(email) {
    if (/^[-_.a-z0-9]+@[a-z]+.[a-z]{2,3}$/ig.test(email) || email === null) {
      return true;
    } else {
      console.log(`Invalid email`);
      return false;
    }
  }

  static checkPhone(phone) {
    if (/\d-\d{3}-\d{3}-\d{4}/g.test(phone) || phone === null) {
      return true;
    } else {
      console.log(`Invalid phone number, phone must contain only digits and in US format of x-xxx-xxx-xxxx`);
      return false;
    }
  }

  static show() {
    let query = "select a.id, firstname, lastname, email, phone, company, group_name from (select c.id, c.firstname, c.lastname, c.email, c.phone, c.company, gc.group_id from contacts c left join group_contacts gc on c.id = gc.contact_id) a left join groups g on a.group_id = g.id";
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
          console.log(`The record with id ${id} has been deleted from 'contacts'`);
        }
      });
    });
  }

  save() {
    let obj = this;
    if (obj.id !== null && Contact.validate(obj)) {
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
                  console.log(`Record with id ${id} from 'contacts' has been updated`);
                }
              });
            });
          }
        });
      });
    } else if (obj.id === null && Contact.validate(obj)){
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
            console.log(`A new record has been inserted into the 'contacts'`);
          }
        });
      });
    }
  }

  static update(id, obj) {
    let update = {};
    update.firstname = obj.firstname || null;
    update.lastname = obj.lastname || null;
    update.email = obj.email || null;
    update.phone = obj.phone || null;
    update.company = obj.company || null;
    if (Contact.validateUpdate(update)) {
      db.serialize(() => {
        db.get(`SELECT * FROM contacts Where id = ${id}`, (err, row) => {
          if (err) {
            console.log(err);
          } else {
            let foundObj = row;
            foundObj.firstname = obj.firstname || foundObj.firstname;
            foundObj.lastname = obj.lastname || foundObj.firstname;
            foundObj.email = obj.email || foundObj.email;
            foundObj.phone = obj.phone || foundObj.phone;
            foundObj.company = obj.company || foundObj.company;
            let query = `UPDATE contacts SET firstname = '${foundObj.firstname}', lastname = '${foundObj.lastname}', email = '${foundObj.email}', phone = '${foundObj.phone}', company = '${foundObj.company}' WHERE id = ${id}`;
            db.serialize(() => {
              db.run(query, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Record with id ${id} from 'contacts' has been updated`);
                }
              });
            });
          }
        });
      });
    }
  }

  static findById(id) {
    let query = `SELECT * FROM contacts Where id = ${id}`;
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










export default Contact
