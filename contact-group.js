const sqlite = require('sqlite3').verbose();
var file = 'address_book.db';
var db = new sqlite.Database(file);

class ContactGroup {
    constructor(options) {
        this.contact_id = options.contact_id;
        this.group_id = options.group_id;
        this.id = null;
    }
    save() {
        let obj = this;
        if (this.id == null) {
            db.serialize(function() {
                db.run(`INSERT INTO contact_group (contact_id,group_id) VALUES (${obj.contact_id},${obj.group_id})`, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Contact Group Insert Row..");
                    }
                });
            });

            db.all(`Select max(id) as id from contact_group`, function(err, raw) {
                if (err) {
                    console.log(err);
                } else {
                    obj.id = raw[0].id;
                }
            });
        } else {
            db.serialize(function() {
                db.run(`UPDATE contact_group SET contact_id='${obj.contact_id}', group_id='${obj.group_id}' WHERE id=${obj.id}`, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Contact Group Update Row..");
                    }
                });
            });
        }
    }
    static create(contact_id, group_id) {
        db.serialize(function() {
            db.run(`INSERT INTO contact_group (contact_id,group_id) VALUES (${contact_id},${group_id})`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Contact Group Insert Row..");
                }
            });
        });
        return 'Query Insert.';
    }
    static update(id, contact_id, group_id) {
        db.serialize(function() {
            db.run(`UPDATE contact_group SET contact_id ='${contact_id}',group_id ='${group_id}' WHERE id=${id}`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Contact Group Update Row..');
                }
            });
        });
        return 'Query Update.';
    }
    static show() {
        db.serialize(function() {
            db.each(`SELECT A.id as id, B.nama as nama, C.nama_group as namaG FROM contact_group A, contact B, groups C where A.contact_id = B.id AND A.group_id = C.id ORDER BY A.id`, function(err, row) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${row.id} | ${row.nama} |${row.namaG}`);
                }
            });
        });
        return 'Query Show.';
    }
    static delete(id) {
        db.serialize(function() {
            db.run(`DELETE FROM contact_group WHERE id=${id};`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Automatic Delete Contact Group Succes.');
                }
            });
        });
        return 'Query Delete.';
    }
}

export default ContactGroup
