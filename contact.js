const sqlite = require('sqlite3').verbose();

var file = 'address_book.db';
var db = new sqlite.Database(file);

class Contact {
  constructor (args) {
    this._id = null;

    this._name = "unknown";
    if(args && args.hasOwnProperty('name'))
      this._name = args['name'];

    this._company = "";
    if(args && args.hasOwnProperty('company'))
      this._company = args['company'];

    this._phone = "";
    if(args && args.hasOwnProperty('phone'))
      this._phone = args['phone'];

    this._email = "";
    if(args && args.hasOwnProperty('email'))
      this._email = args['email'];

    this._is_saved = false;
  }

  get id() {
    // let query = `SELECT id from Contacts where name = '${this.name}'`;
    // db.all(query, function(err, rows) {
    //   rows.forEach(function(row) {
    //     // console.log(row);
    //     console.log(`${row.id}`);
    //     return row.id;
    //   })

      // console.log("rows[0]", rows[0]);
      //
      // if(rows.length > 0){
      //   console.log("rows[0].id", rows[0].id);
      //
      //   this._id = rows[0].id;
      // }

    // });

    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get phone() {
    return this._phone;
  }

  get email() {
    return this._email;
  }

  save() {
    if(this._is_saved) {
      // update
      let query = `UPDATE contacts SET name = '${this._name}', phone = '${this._phone}', email = '${this._email}' WHERE id = ${this._id}`

      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            console.log('Contact has been updated.');
          }
        });
      });



    }
    else {
      // this line is important
      let user = this;


      // if not exist, insert
      let query = `INSERT INTO Contacts(name, company, phone, email) VALUES ( '${this._name}', '${this._company}', '${this._phone}', '${this._email}')`;
      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            user._id = this.lastID; // does not work!!
            user._is_saved = true;
            console.log("user._id", user._id);

            console.log('Contact has been added successfully!');
          }
        });

      });

    }
  }


} // end of Contact Class


let contact = new Contact({name: 'lona'});
// console.log(contact.id);
// contact.save();
// console.log("After Insert ---> ID", contact.id);

// const repl = require('repl');
// const replServer = repl.start({prompt: '$ '});
//
// replServer.context.contact = contact;
// replServer.context.save = contact.save;
// replServer.context.id = contact.id;
// replServer.context.name = contact.name;

module.exports = Contact;
