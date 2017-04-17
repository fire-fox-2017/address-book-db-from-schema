"use strict"

const sqlite = require('sqlite3').verbose()
const file = 'address_book.db'
const db = new sqlite.Database(file)

class ContactGroup {
    constructor(objContactGroup) {
        this.contactId = objContactGroup.contact_id
        this.groupId = objContactGroup.group_id
        this.id = null
    }

    save_data() {
        let obj = this
        if (this.id !== null) {
            db.serialize(() => {
                let UPDATE_DATA = `UPDATE contactGroups SET contact_id = '${obj.contact_id}', group_id = '${obj.group_id}' WHERE id = ${obj.id}`
                db.run(UPDATE_DATA, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Update is success`);
                    }
                })
            })
        } else {
            db.serialize(() => {
                let SEED_DATA = `INSERT INTO contactGroups(contact_id, group_id, is_deleted) VALUES('${obj.contact_id}', '${obj.group_id}', 'false')`
                db.run(SEED_DATA, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        obj.id = this.lastID
                        console.log(`Insert is success`);
                    }
                })
            })
        }
    }

    static create(contact_id, group_id) {
        let SEED_DATA = `INSERT INTO contactGroups(contact_id, group_id, is_deleted) VALUES(${contact_id}, ${group_id}, 'false')`
        db.run(SEED_DATA, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Insert is success`);
            }
        })
    }
}

export default ContactGroup