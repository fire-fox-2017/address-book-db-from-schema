"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = 'address_book.db';
var db = new sqlite.Database(file);


var CREATE_TABLE_CONTACTS = `CREATE TABLE IF NOT EXISTS contacts
                            (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, phone TEXT, email TEXT)`

var CREATE_TABLE_GROUPS = `CREATE TABLE IF NOT EXISTS groups
                           (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT)`

var CREATE_TABLE_GROUPSCONTACTS = `CREATE TABLE IF NOT EXISTS groupscontacts
                                  (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER, contact_id INTEGER, is_deleted BOOLEAN)`

let createDB = () =>{
  db.serialize(function(){
    db.run(CREATE_TABLE_CONTACTS, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('CREATE TABLE CONTACTS SUKSES');
      }
    });

    db.run(CREATE_TABLE_GROUPS, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('CREATE TABLE GROUPS SUKSES');
      }
    });

    db.run(CREATE_TABLE_GROUPSCONTACTS, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('CREATE TABLE GROUPSCONTACTS SUKSES');
      }
    });
  });
}

let start = repl.start("> ")
start.context.createDB = createDB

  