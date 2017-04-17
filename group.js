"use strict"

const sqlite = require('sqlite3').verbose()
const file = 'address_book.db'
const db = new sqlite.Database(file)

class Group {
    constructor(objGroup) {
        this.id = null
        this.name = objGroup.name
    }

    save_data() {
        let obj = this
        if (this.id !== null) {
            db.serialize(() => {
                let UPDATE_DATA = `UPDATE groups SET name = '${obj.name}' WHERE id = ${obj.id}`
                db.run(UPDATE_DATA, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Update: ${obj.name} is success`);
                    }
                })
            })
        } else {
            db.serialize(() => {
                let SEED_DATA = `INSERT INTO groups(name) VALUES('${obj.name}')`
                db.run(SEED_DATA, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Insert: ${obj.name} is success`);
                    }
                })
            })
        }
    }

    static create(name) {
        let SEED_DATA = `INSERT INTO groups(name) VALUES('${name}')`
        db.run(SEED_DATA, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Insert: ${name} is success`);
            }
        })
    }

    static update(data, id) {
        let UPDATE_DATA = `UPDATE groups SET name = '${data}' WHERE id = ${id}`
        db.run(UPDATE_DATA, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Update is successful`);
            }
        })
    }

    static delete(id) {
        db.serialize(() => {
            let DELETE_DATA = `DELETE FROM groups WHERE id = ${id}`
            db.run(DELETE_DATA, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Delete is successful`);
                    let UPDATE_DATA = `UPDATE contactGroups SET is_deleted = 'true' WHERE group_id = ${id}`
                    db.run(UPDATE_DATA, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`Update is successful`);
                        }
                    })
                }
            })
        })
    }

    static show(id) {
        db.serialize(() => {
            let GET_DATA_GROUPS = `SELECT * FROM groups where id = ${id}`
            db.each(GET_DATA_GROUPS, (err, row) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(row);
                }
            })

            let GET_DATA_GROUP_CONTACT = `SELECT * FROM contactGroups WHERE group_id = ${id} AND is_deleted = 'false'`
            db.each(GET_DATA_GROUP_CONTACT, (err, row) => {
                if (err) {
                    console.log(err);
                } else {
                    let GET_DATA_CONTACTS = `SELECT name FROM contacts WHERE id = ${row.id}`
                    db.each(GET_DATA_CONTACTS, (err, row) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(row.name);
                        }
                    })
                }
            })
        })
    }
}

export default Group