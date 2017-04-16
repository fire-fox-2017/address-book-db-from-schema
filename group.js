"use strict"

const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('addressbook.db');
import ContactGroup from "./contact-group.js"


class Group {
    constructor(options) {
        this.id = options['id'] || null
        this.group_name = options['group_name'] || null

    }

    static create(groupName) {
        let INSERT_DATA = `INSERT INTO groups (group_name) VALUES ('${groupName}');`;
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
    }

    static updateById(id, groupName) {

        var UPDATE_DATA = `UPDATE groups SET group_name = '${groupName}' WHERE id=${id}`;
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
    }

    static deleteById(id) {
        let DELETE_QUERY = `DELETE FROM groups WHERE id=${id}`;
        console.log(DELETE_QUERY)
        db.serialize(function() {
            db.run(DELETE_QUERY, function(err) {
                if (err) {
                    console.log(err);
                } else {
                  ContactGroup.deleteGrp(id)
                    console.log('DELETE SUCCESS');
                }
            });
        });
    }

    static showGroup() {
        let SELECT_QUERY = `SELECT * FROM groups`;
        console.log(SELECT_QUERY);
        db.serialize(function() {

            db.each(SELECT_QUERY, function(err, row) {
                if (err) {
                    console.log(err);
                }
                console.log(JSON.stringify(row))
            });
        });

    }









}

export default Group
