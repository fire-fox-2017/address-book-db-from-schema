const sqlite = require('sqlite3').verbose();
var file = 'address_book.db';
var db = new sqlite.Database(file);

class Group {
    constructor(options) {
        this.nama_group = options.nama_group;
        this.id = null;
    }
    save() {
        let obj = this;
        if (this.id == null) {
            db.serialize(function() {
                db.run(`INSERT INTO groups (nama_group) VALUES ('${obj.nama_group}')`, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Group Insert Row..");
                    }
                });
                db.all(`Select max(id) as id from groups`, function(err, raw) {
                    if (err) {
                        console.log(err);
                    } else {
                        obj.id = raw[0].id;
                        db.run(`INSERT INTO contact_group (contact_id,group_id) VALUES ('${1}',${obj.id})`, function(err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("Automatic Group Contact Insert Row..");
                            }
                        });
                    }
                });
            });
        } else {
            db.serialize(function() {
                db.run(`UPDATE groups SET nama_group='${obj.nama_group}' WHERE id=${obj.id}`, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Group Update Row..");
                    }
                });
            });
        }
    }
    static create(nama_group) {
        db.serialize(function() {
            db.run(`INSERT INTO groups (nama_group) VALUES ('${nama_group}')`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Group Insert Row..');
                }
            });
            db.all(`Select max(id) as id from groups`, function(err, raw) {
                if (err) {
                    console.log(err);
                } else {
                    let temId = raw[0].id;
                    db.run(`INSERT INTO contact_group (contact_id,group_id) VALUES (${1},${temId})`, function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Automatic Contact Group Insert Row..");
                        }
                    });
                }
            });
        });
        return 'Query Insert.';
    }
    static update(id, nama_group) {
        db.serialize(function() {
            db.run(`UPDATE groups SET nama_group ='${nama_group}' WHERE id=${id}`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Group Update Row..');
                }
            });
        });
        return 'Query Update.';
    }
    static show() {
        db.serialize(function() {
            db.each(`SELECT A.id as id, A.nama_group as namaG , C.nama as nama FROM groups A, contact_group B, contact C where A.id = B.group_id AND B.contact_id = C.id `, function(err, row) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${row.id} | ${row.namaG} | ${row.nama}`);
                }
            });
        });
        return 'Query Show.';
    }
    static delete(id) {
        db.serialize(function() {
            db.run(`DELETE FROM groups WHERE id=${id};`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Delete Group Succes.');
                }
            });
        });
        db.serialize(function() {
            db.run(`DELETE FROM contact_group WHERE group_id=${id};`, function(err) {
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

export default Group
