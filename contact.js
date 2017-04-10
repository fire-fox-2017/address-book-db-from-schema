const sqlite = require('sqlite3').verbose();

var file = 'address_book.db';
var db = new sqlite.Database(file);

class Contact {
  constructor (args) {
    this._id = null;

    this.name = "unknown";
    if(args && args.hasOwnProperty('name'))
      this.name = args['name'];

    this.company = "";
    if(args && args.hasOwnProperty('company'))
      this.company = args['company'];

    this.phone = "";
    if(args && args.hasOwnProperty('phone'))
      this.phone = args['phone'];

    this.email = "";
    if(args && args.hasOwnProperty('email'))
      this.email = args['email'];

    this.is_saved = false;
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

  // get name() {
  //   return this.name;
  // }

  save() {
    if(this.is_saved) {
      // update
      let query = `UPDATE contacts SET name = '${this.name}', phone = '${this.phone}', email = '${this.email}' WHERE id = ${this._id}`

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
      let user = this;
      // if not exist, insert
      let query = `INSERT INTO Contacts(name, company, phone, email) VALUES ( '${this.name}', '${this.company}', '${this.phone}', '${this.email}')`;
      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            user._id = this.lastID; // does not work!!
            user.is_saved = true;
            console.log("user._id", user._id);

            console.log('QUERY Ran Successfully!');
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

const repl = require('repl');
const replServer = repl.start({prompt: '$ '});

replServer.context.contact = contact;
// replServer.context.save = contact.save;
// replServer.context.id = contact.id;
// replServer.context.name = contact.name;
