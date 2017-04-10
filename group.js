const sqlite = require('sqlite3').verbose();

var file = 'address_book.db';
var db = new sqlite.Database(file);

class Group {
  constructor (args) {
    this._id = null;

    this._name = ""
    if(args && args.hasOwnProperty('name'))
      this._name = args['name'];

    this.is_saved = false;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  save() {
    if(this.is_saved) {
      // update
      let query = `UPDATE groups SET name = '${this._name}' where id = ${this._id}`

      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            console.log('Group has been updated.');
          }
        });
      });



    }
    else {
      let user = this;
      // if not exist, insert
      let query = `INSERT INTO Groups(name) VALUES ( '${this._name}')`;
      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            user._id = this.lastID; // does not work!!
            user.is_saved = true;
            console.log("user._id", user._id);

            console.log('Group has been added successfully.');
          }
        });

      });

    }
  }


} // end of Group class

let group = new Group({name: 'Friends'});
// console.log(contact.id);
// contact.save();
// console.log("After Insert ---> ID", contact.id);

// const repl = require('repl');
// const replServer = repl.start({prompt: '$ '});
//
// replServer.context.group = group;
// replServer.context.save = contact.save;
// replServer.context.id = contact.id;
// replServer.context.name = contact.name;

module.exports = Group;
