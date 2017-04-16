"use strict"

const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('addressbook.db');

class ContactGroup {
    constructor() {
        // this.id=options['id'];
        // this.id_contact=options['id_contact'];
        // this.id_group=options['id_group'];

    }

    static create(contactId, groupId) {
        let INSERT_DATA = `INSERT INTO contact_group (id_contact, id_group) VALUES (${contactId}, ${groupId});`;
        console.log(INSERT_DATA)
        db.serialize(function() {
            db.run(INSERT_DATA, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('INSERT SUCCESS contact_group');
                }
            });
        });

    }

    static update(contactId, groupId) {
        var UPDATE_DATA = `UPDATE contact_group SET id_group = ${groupId}  WHERE id_contact=${contactId};`;
        console.log(UPDATE_DATA)
        db.serialize(function() {
            db.run(UPDATE_DATA, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('UPDATE contact_group');
                }
            });
        });
    }

    static deleteCon(id){
      var DELETE_DATA = `DELETE FROM contact_group WHERE id_contact = ${id};`;
      db.serialize(function() {
          db.run(DELETE_DATA, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log('DELETE SUCCESS');
              }

          });
      });

    }
    static deleteGrp(id){
      var DELETE_DATA = `DELETE FROM contact_group WHERE id_group = ${id};`;
      db.serialize(function() {
          db.run(DELETE_DATA, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log('DELETE SUCCESS');
              }

          });
      });

    }




}

export default ContactGroup
