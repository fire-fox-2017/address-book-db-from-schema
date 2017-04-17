"use strict"

//write your code here
const fs = require('fs');

const sqlite = require('sqlite3').verbose();
var file = 'address_book.db';
var db = new sqlite.Database(file);

var CREATE_TABLE_CONTACT = "CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY" +
    " AUTOINCREMENT, nama TEXT NOT NULL, perusahaan TEXT NOT NULL, nomor_telpon TEXT NOT NULL,email TEXT NOT NULL);";
var CREATE_TABLE_GROUP = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY" +
    " AUTOINCREMENT, nama_group TEXT NOT NULL);";
var CREATE_TABLE_CONTACT_GROUP = "CREATE TABLE IF NOT EXISTS contact_group (id INTEGER PRIMARY KEY" +
    " AUTOINCREMENT, contact_id INTEGER,  group_id INTEGER);";


let seed_group = JSON.parse(fs.readFileSync('group-dummy.json', 'utf8'));
let seed_contact = JSON.parse(fs.readFileSync('contact-dummy.json', 'utf8'));
let seed_contact_group = JSON.parse(fs.readFileSync('contact-group-dummy.json', 'utf8'));


let createTable1 = () => {
    db.serialize(function() {
        db.run(CREATE_TABLE_CONTACT, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Create Table Contact Succes.');
            }
        });
    });
}
let createTable2 = () => {
    db.serialize(function() {
        db.run(CREATE_TABLE_GROUP, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Create Table Group Succes.');
            }
        });
    });
}
let createTable3 = () => {
    db.serialize(function() {
        db.run(CREATE_TABLE_CONTACT_GROUP, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Create Contact Group Succes.');
            }
        });
    });
}
let seedData1 = () => {
    // console.log(seed_contact.length);
    // console.log(seed_contact[2].nama);
    db.serialize(function() {
        for (let i = 0; i < seed_contact.length; i++) {
            db.run(`INSERT INTO contact (nama,perusahaan,nomor_telpon,email) VALUES ('${seed_contact[i].nama}','${seed_contact[i].perusahaan}','${seed_contact[i].nomor_telpon}','${seed_contact[i].email}')`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Contact Insert Row..");
                }
            });
        }
        for (let i = 0; i < seed_group.length; i++) {
            db.run(`INSERT INTO groups (nama_group) VALUES ('${seed_group[i].nama_group}')`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Group Insert Row..");
                }
            });
        }
        for (let i = 0; i < seed_contact_group.length; i++) {
            db.run(`INSERT INTO contact_group (contact_id,group_id) VALUES (${seed_contact_group[i].contact_id},${seed_contact_group[i].group_id})`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Contact Group Insert Row..");
                }
            });
        }
    });
}
class Setup {
    constructor() {

    }
    run() {
        createTable1();
        createTable2();
        createTable3();
        seedData1();
    }
}

export default Setup
