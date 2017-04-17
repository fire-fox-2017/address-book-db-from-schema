"use strict"

const sqlite = require('sqlite3').verbose()
const file = 'address_book.db'
const db = new sqlite.Database(file)

class Contact {
    constructor(objContact = {}) {
        this.id = null
        this.name = objContact.name
        this.company = objContact.company
        this.phone = objContact.phone
        this.email = objContact.email
    }

    save_data() {
        let obj = this
        if (this.id !== null) {
            db.serialize(() => {
                let UPDATE_DATA = `UPDATE contacts SET name='${obj.name}', company='${obj.company}', phone='${obj.phone}', email='${obj.email}' WHERE id = ${obj.id}`
                db.run(UPDATE_DATA, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Update: ${obj.name}, ${obj.company}, ${obj.phone}, ${obj.email} success`);
                    }
                })
            })
        } else {
            db.serialize(() => {
                let SEED_DATA = `INSERT INTO contacts(name, company, phone, email) VALUES('${obj.name}', '${obj.company}', '${obj.phone}', '${obj.email}')`
                db.run(SEED_DATA, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Insert: ${obj.name}, ${obj.company}, ${obj.phone}, ${obj.email} success`);
                    }
                })
            })
        }
    }

    static validationEmail(email) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (regEmail.test(email)) {
            return true
        } else {
            return false
        }
    }

    static validationPhone(phone) {
        if (phone.length <= 13 && phone.length >= 10) {
            return true
        } else {
            return false
        }
    }

    static create(name, company, phone, email) {
        let validationEmail = Contact.validationEmail(email)
        let validationPhone = Contact.validationPhone(phone)
        if (validationEmail == true && validationPhone == true) {
            let SEED_DATA = `INSERT INTO contacts(name, company, phone, email) VALUES('${name}', '${company}', '${phone}', '${email}')`
            db.run(SEED_DATA, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Insert: ${name}, ${company}, ${phone}, ${email} success`);
                }
            })
        } else if (validationEmail !== true) {
            console.log(`Email is not valid`);
        } else if (validationPhone !== true) {
            console.log(`Phone is not valid`);
        }
    }

    static update(colName, data, id) {
        let UPDATE_DATA = `UPDATE contacts SET ${colName} = '${data}' WHERE id = ${id}`
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
            let DELETE_DATA = `DELETE FROM contacts WHERE id = ${id}`
            db.run(DELETE_DATA, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Delete is successful`);
                }
            })

            let UPDATE_DATA = `UPDATE contactGroups SET is_deleted = 'true' WHERE contact_id = ${id}`
            db.run(UPDATE_DATA, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Update is successful`);
                }
            })
        })
    }

    static show(id) {
        db.serialize(() => {
            let GET_DATA_CONTACTS = `SELECT * FROM contacts where id = ${id}`
            db.each(GET_DATA_CONTACTS, (err, row) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(row);
                }
            })

            let GET_DATA_GROUP_CONTACT = `SELECT * FROM contactGroups WHERE contact_id = ${id} AND is_deleted = 'false'`
            db.each(GET_DATA_GROUP_CONTACT, (err, row) => {
                if (err) {
                    console.log(err);
                } else {
                    let GET_DATA_GROUPS = `SELECT name FROM groups WHERE id = ${row.id}`
                    db.each(GET_DATA_GROUPS, (err, row) => {
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

export default Contact