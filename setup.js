// "use strict"
// const sqlite3 = require('sqlite3').verbose();
// var file = 'address_book.db';
// var db = new sqlite3.Database(file);
//
// //Initialize REPLServer
// const repl = require('repl');
// let REPLServer = repl.start({prompt : '> '});
//
// //SQL Statement
// var CREATE_TABLE_INDIVIDUAL_STUDENTS = "CREATE TABLE IF NOT EXISTS individual_contacts ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, mobile_phone TEXT);";
// var CREATE_TABLE_GROUP = "CREATE TABLE IF NOT EXISTS group ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);";
// var CREATE_TABLE_CONTACT_GROUP = "CREATE TABLE IF NOT EXISTS contact_group (id INTEGER PRIMARY KEY AUTOINCREMENT, individual_contact_id INTEGER FOREIGN KEY REFERENCES individual_contacts(id) , group_id INTEGER FOREIGN KEY REFERENCES group(id)) ;";
// // var SEED_DATA = "INSERT INTO students (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza','Fahmi','1983-12-3');";
//
// //CREATE_TABLE_INDIVIDUAL_STUDENTS
// let create_table_1 = () =>{
//   //Run SQL one at a time
//   db.serialize(function(){
//     //Create TABLE
//     db.run(CREATE_TABLE_INDIVIDUAL_STUDENTS, function(err){
//       if (err){
//         console.log(err);
//       } else {
//         console.log('CREATE_TABLE_INDIVIDUAL_STUDENTS');
//       }
//     });
//   });
// }
//
// let create_table_2 = () =>{
//   //Run SQL one at a time
//   db.serialize(function(){
//     //Create TABLE
//     db.run(CREATE_TABLE_GROUP, function(err){
//       if (err){
//         console.log(err);
//       } else {
//         console.log('CREATE_TABLE_GROUP');
//       }
//     });
//   });
// }
//
// let create_table_3 = () =>{
//   //Run SQL one at a time
//   db.serialize(function(){
//     //Create TABLE
//     db.run(CREATE_TABLE_CONTACT_GROUP, function(err){
//       if (err){
//         console.log(err);
//       } else {
//         console.log('CREATE_TABLE_CONTACT_GROUP');
//       }
//     });
//   });
// }
// // SEED_DATA
// // let seedData = () => {
// //   //Run SQL one at a time
// //   db.serialize(function(){
// //     //SEED_DATA
// //     db.run(SEED_DATA, function(err){
// //       if (err){
// //         console.log(err);
// //       } else {
// //         console.log('SEED_DATA');
// //       }
// //     });
// //   });
// // }
//
// REPLServer.context.create_table1 = create_table_1;
// REPLServer.context.create_table1 = create_table_2;
// REPLServer.context.create_table1 = create_table_3;
// // REPLServer.context.seed_data = seedData;
"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
//write your code here

var file = 'contact.db';
var db = new sqlite.Database(file);

// let replServer = repl.start({prompt: '> '});

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT, email TEXT,phone TEXT,);";
var SEED_DATA = "INSERT INTO students (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');";

let createTable = () => {
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



let seedData = () =>{
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

// replServer.context.create = createTable
// replServer.context.seed = seedData


const fs = require('fs');
class Person {
    constructor(id, first_name, last_name, email, phone) {
        this.id = id;
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
        this._people = fs.readFileSync(file).toString().split("\n");
        this._objPeople = []
    }

    get peopleLength() {
        return this._people.length
    }

    parsingtoObject() {
        let test;
        for (let i = 0; i < this._people.length-1; i++) {
            test = this._people[i].split(',');
            this._objPeople.push(new Person(test[0], test[1], test[2], test[3], test[4]))
        }
        // console.log();
        // console.log(JSON.stringify(this._objPeople[25]));
    }

    save() {
        fs.writeFile('contacs.json', JSON.stringify(this._objPeople), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
}

let parser = new PersonParser('contact.csv')
parser.parsingtoObject();
parser.save();
