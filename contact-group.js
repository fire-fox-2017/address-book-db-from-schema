var Contact = require('./contact');
var Group = require('./group');



const sqlite = require('sqlite3').verbose();

var file = 'address_book.db';
var db = new sqlite.Database(file);

class ContactGroup {
  constructor (args) {
    this._id = null;
    this._id_contact = null;
    if(args && args.hasOwnProperty('id_contact'))
      this._id_contact = args['id_contact'];


    this._id_group = null;
    if(args && args.hasOwnProperty('id_group'))
      this._id_group = args['id_group'];

    this._is_saved = false;
  }

  get id() {
    return this._id;
  }

  get id_contact() {
    return this._id_contact;
  }

  get id_group() {
    return this._id_group;
  }

  set id_contact(id_contact) {
    this._id_contact = id_contact;
  }

  set id_group(id_group) {
    this._id_group = id_group;
  }

  save() {
    if(this.is_saved) {
      // update
      let query = `UPDATE contact_groups SET id_contact = '${this._id_contact}', id_group = '${this._id_group}' where id = ${this._id}`

      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            console.log('ContactGroup has been updated.');
          }
        });
      });
    }
    else {
      let user = this;
      // if not exist, insert
      let query = `INSERT INTO contact_groups(id_contact, id_group) VALUES ( '${this._id_contact}', '${this._id_group}')`;
      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            user._id = this.lastID; // does not work!!
            user.is_saved = true;
            console.log("user._id", user._id);

            console.log('ContactGroup has been inserted into DB.');
          }
        });

      });

    }
  }

  addContact(name, company, phone, email) {
    let contact = new Contact({name: name, company: company, phone: phone, email: email});
    contact.save();
  }

  showContact() {
    let query = `SELECT * FROM Contacts`;
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.name} ${row.company} ${row.phone} ${row.email}`);
      })
    });
  }

  showGroup() {
    let query = `SELECT * FROM Groups`;
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.name}`);
      })
    });
  }

  showAddressBook() {
    let query = `SELECT * FROM contact_groups`;
    db.all(query, function(err, rows) {
      console.log("(id, contact_id, group_id)")
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.id_contact} ${row.id_group}`);
      })
    });
  }

  addGroup(groupname) {
    let group = new Group({name: groupname});
    group.save();
  }

  updateContact(id, name, company, phone, email) {
    let query =
      `UPDATE contacts SET name = '${name}', company = '${company}', phone = '${phone}', email = '${email}' WHERE id = ${id}`;

      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            console.log('Contact has been updated Successfully!');
          }
        });
      });
  }

  updateGroup(id, name) {
    let query =
      `UPDATE groups SET name = '${name}' WHERE id = ${id}`;

      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            console.log('Group has been updated Successfully!');
          }
        });
      });
  }


  deleteContact(id_contact) {
    this.deleteAddressBookByContact(id_contact);

    let query = `DELETE FROM contacts WHERE id = ${id_contact}`;
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log(`Contact with id '${id_contact}' has been deleted.`);
        }
      });
    });
  }

  deleteGroup(id_group) {
    this.deleteAddressBookByGroup(id_group);

    let query = `DELETE FROM groups WHERE id = ${id_group}`;
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log(`Group with id '${id_group}' has been deleted.`);

        }
      });
    });
  }

  deleteAddressBookByGroup(id_group) {
    let query = `DELETE FROM contact_groups WHERE id_group = ${id_group}`;
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log(`Contact Groups with Group id = '${id_group}' has been deleted.`);
        }
      });
    });
  }

  deleteAddressBookByContact(id_contact) {
    let query = `DELETE FROM contact_groups WHERE id_contact = ${id_contact}`;
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log(`Contact Groups with Contact id = '${id_contact}' has been deleted.`);
        }
      });
    });
  }



  assignContactToGroup(id_contact, id_group) {
    let query = `INSERT INTO contact_groups(id_contact, id_group) VALUES ( '${id_contact}', '${id_group}')`;
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log(`Contact with id=${id_contact} has been assigned to Group id='${id_group}'.`);
        }
      });

    });  }


}// end of ContactGroup class

let cg = new ContactGroup({id_contact: 40, id_group: 3});

const repl = require('repl');
const replServer = repl.start({prompt: '$ '});

replServer.context.cg = cg;





module.exports = ContactGroup;
//
