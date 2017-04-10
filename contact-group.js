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

}// end of ContactGroup class

let cg = new ContactGroup({id_contact: 40, id_group: 3});

const repl = require('repl');
const replServer = repl.start({prompt: '$ '});

replServer.context.cg = cg;






//
