"use strict"

import ContactGroup from "./contact-group.js"
import Group from "./group.js"

const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('addressbook.db');

class Contact {
    constructor(options) {
        this.first_name = options['first_name'];
        this.last_name = options['last_name'] || '';

        if (Contact.validateEmail(options['email'])) {
            this.email = options['email'];
        } else {
            console.log('format email salah, dijadikan null');
            this.email = null
        }

        if (Contact.validatePhone(options['phone'])) {
            this.phone = options['phone'];
        } else {
            console.log('format phone salah, dijadikan null');
            this.phone = null
        }


        this.id = options['id'] || null;
        this.group = options['group'] || null;


    }
    static validateEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)

    }
    static validatePhone(phone) {
        return /^[0-9]{10,12}$/.test(phone)
    }

    delete() {
        var DELETE_DATA = `DELETE FROM contacts WHERE id = ${this.id};`;
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
    static showContactbyId() {
        let SELECT_QUERY = `SELECT * FROM contacts WHERE id = '${id}'`;
        console.log(SELECT_QUERY)
        db.serialize(function() {
            db.each(SELECT_QUERY, function(err, row) {
                if (err) {
                    console.log(err);
                }
                console.log(JSON.stringify(row))
            });
        });

    }

    static deleteById(id) {
        var DELETE_DATA = `DELETE FROM contacts WHERE id = ${id};`;
        db.serialize(function() {
            db.run(DELETE_DATA, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('DELETE SUCCESS');
                    ContactGroup.deleteCon(id)
                }

            });
        });

    }

    static updateById(options) {
        let first_name = options['first_name'];
        let last_name = options['last_name'] || '';
        let email = options['email'] || '';
        let phone = options['phone'] || '';
        let group = options['group'] || null;
        let id = options['id'];

        var UPDATE_DATA = `UPDATE contacts SET first_name = '${first_name}',last_name = '${last_name}', email = '${email}', phone = '${phone}' WHERE id=${id};`;
        console.log(UPDATE_DATA)
        db.serialize(function() {
            db.run(UPDATE_DATA, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('UPDATE SUCCESS');
                }
            });
        });

        if (group !== null) {
            let SELECT_QUERY = `SELECT * FROM groups WHERE group_name = '${group}'`;
            // console.log(SELECT_QUERY)
            db.serialize(function() {
                db.all(SELECT_QUERY, function(err, row) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (row.length === 0) {
                            console.log('tidak ada group tersebut');
                        } else {
                            let SELECT_QUERY2 = `SELECT * FROM contact_group WHERE id_group = '${row[0].id}' AND  id_contact = '${id}'`;
                            // console.log(SELECT_QUERY2)
                            db.serialize(function() {
                                db.all(SELECT_QUERY2, function(err, row2) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    if (row2.length === 0) {
                                        //asumsi grupnya jadi bertambah
                                        ContactGroup.create(id, row[0].id)
                                    } else {
                                        console.log('sudah di dalam group');
                                    }
                                });
                            });}
                    }
                });
            });
        }
    }

    static create(options) {
        let first_name = options['first_name'];
        let last_name = options['last_name'] || '';
        let email = options['email'] || '';
        let phone = options['phone'] || '';
        let group = options['group'] || null;
        let id = 0;

        if (Contact.validatePhone(phone)!==true) {
          console.log('Format phone salah, Aborting...');
          return
        }

        if (Contact.validateEmail(email) !== true) {
            console.log('Format Email salah, Aborting...');
            return
        }

        let INSERT_DATA = `INSERT INTO Contacts (first_name, last_name, email, phone) VALUES ('${first_name}', '${last_name}' ,'${email}','${phone}');`;
        console.log(INSERT_DATA)
        db.serialize(function() {
            db.run(INSERT_DATA, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('INSERT SUCCESS');
                }
            });
        });

        let LAST_ID = `SELECT MAX(id) FROM contacts`;
        db.serialize(function() {
            db.each(LAST_ID, function(err, row) {
                if (err) {
                    console.log(err);
                } else {
                    id = Number(row['MAX(id)']);
                }
            });
        });

        if (group !== null) {
            let SELECT_QUERY = `SELECT * FROM groups WHERE group_name = '${group}'`;
            console.log(SELECT_QUERY)
            db.serialize(function() {
                db.all(SELECT_QUERY, function(err, row) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (row.length === 0) {
                            console.log('didnt find group : change this contact_group to null');
                            obj.group = null;

                        } else {
                            ContactGroup.create(id, row[0].id)
                        }
                    }

                });
            });
        }
    }

    save() {

        if (this.id !== null) {
            var UPDATE_DATA = `UPDATE contacts SET first_name = '${this.first_name}',last_name = '${this.last_name}', email = '${this.email}', phone = '${this.phone}' WHERE id=${this.id};`;
            console.log(UPDATE_DATA)
            db.serialize(function() {
                db.run(UPDATE_DATA, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('UPDATE SUCCESS');
                    }
                });
            });

        } else {
            let id = this.id;
            let obj = this;
            let SEED_DATA = `INSERT INTO Contacts (first_name, last_name, email, phone) VALUES ('${this.first_name}', '${this.last_name}' ,'${this.email}','${this.phone}');`;
            console.log(SEED_DATA)
            db.serialize(function() {
                db.run(SEED_DATA, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('INSERT SUCCESS');
                    }
                });
            });

            let LAST_ID = `SELECT MAX(id) FROM contacts`;
            db.serialize(function() {
                db.each(LAST_ID, function(err, row) {
                    if (err) {
                        console.log(err);
                    } else {
                        obj.id = Number(row['MAX(id)']);
                    }
                });
            });

            if (this.group !== null) {
                let group = this.group;
                let obj = this;
                let SELECT_QUERY = `SELECT * FROM groups WHERE group_name = '${this.group}'`;
                console.log(SELECT_QUERY)
                db.serialize(function() {
                    db.all(SELECT_QUERY, function(err, row) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (row.length === 0) {
                                console.log('didnt find group : change this contact_group to null');
                                obj.group = null;

                            } else {
                                ContactGroup.create(obj.id, row[0].id)
                            }
                        }

                    });
                });
            }

        }


    }
    static ShowContact() {
        let SELECT_QUERY = `SELECT * FROM contacts LEFT JOIN contact_group ON contacts.id = contact_group.id_contact LEFT JOIN groups ON contact_group.id_group = groups.id;`;
        db.serialize(function() {
            console.log(` id | first name | last name | Group`);
            db.each(SELECT_QUERY, function(err, row) {
                if (err) {
                    console.log(err);
                }
                console.log(` ${row.first_name} ${row.last_name} | ${row.group_name} | ${row.email} | ${row.phone}`);
            });
        });
    }

}

export default Contact
