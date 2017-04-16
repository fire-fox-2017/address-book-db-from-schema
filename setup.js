"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
//write your code here






const fs = require('fs');
class Person {
    constructor(first_name, last_name, email, phone) {

        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
    }
}

class PersonParser {
    constructor(file) {
        this._file = file
        this._size = 0;
        let replServer = repl.start({
            prompt: '> '
        });
        replServer.context.create = this.createTable
        replServer.context.seed = this.seedData
        replServer.context.createCG = this.createTableCG
        replServer.context.createG = this.createTableGroup


    }

    get peopleLength() {
        return this._people.length
    }

    parsingtoObject() {

    }

    save() {
        fs.writeFile('contacs.json', JSON.stringify(this._objPeople), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }

    createTable() {

        var file = 'addressbook.db';
        var db = new sqlite.Database(file);
        var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT, email TEXT,phone TEXT);";

        db.serialize(function() {

            db.run(CREATE_TABLE, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('CREATE TABLE');
                }
            });
        });
    }
    createTableCG() {

        var file = 'addressbook.db';
        var db = new sqlite.Database(file);
        var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS contact_group (id INTEGER PRIMARY KEY AUTOINCREMENT, id_contact INTEGER NOT NULL, id_group INTEGER NOT NULL);";

        db.serialize(function() {

            db.run(CREATE_TABLE, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('CREATE TABLE contact_group');
                }
            });
        });
    }

    createTableGroup() {

        var file = 'addressbook.db';
        var db = new sqlite.Database(file);
        var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT);";

        db.serialize(function() {

            db.run(CREATE_TABLE, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('CREATE TABLE contact_group');
                }
            });
        });
    }

    seedData() {
        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        }

        let test;
        let objPeople = [];
        let people = fs.readFileSync('contact.csv').toString().split("\n");
        for (let i = 0; i < people.length - 1; i++) {
            test = people[i].split(',');
            objPeople.push(new Person(test[1], test[2], test[3], test[4]))
        }
        // objPeople = JSON.stringify(objPeople)
        // console.log(objPeople[3])

        for (var i = 1; i < objPeople.length; i++) {
            // sleep(1000)
            let SEED_DATA = `INSERT INTO contacts (first_name, last_name, email, phone) VALUES ('${objPeople[i].first_name}', '${objPeople[i].last_name}', '${objPeople[i].email}', '${objPeople[i].phone}');`;
            // console.log(SEED_DATA);
            var file = 'addressbook.db';
            var db = new sqlite.Database(file);
            db.serialize(function() {
                db.run(SEED_DATA, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('SEED DATA');
                    }
                });
            });
        }
    }




}

let parser = new PersonParser()
