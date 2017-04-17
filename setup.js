"use strict"

//write your code here
const fs = require('fs');
const dataContact = JSON.parse(fs.readFileSync('contact.json', 'utf8'));
const dataGroup = JSON.parse(fs.readFileSync('grup.json', 'utf8'));
const dataContactGroup = JSON.parse(fs.readFileSync('contact-group.json', 'utf8'));
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var db = new sqlite.Database('./data.db');

let replServer = repl.start({prompt : '> '});

var createContact = "CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT NOT NULL, perusahaan TEXT, email TEXT, noTelepon TEXT)";
var createGroup = "CREATE TABLE IF NOT EXISTS grup (id INTEGER PRIMARY KEY AUTOINCREMENT, namaGrup TEXT NOT NULL)";
var createContactGroup = "CREATE TABLE IF NOT EXISTS contactGroup (id INTEGER PRIMARY KEY AUTOINCREMENT, idContact INTEGER, idGroup INTEGER)";

let createTableContact = () => {
  db.serialize(function(){
    db.run(createContact, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('Sukses');
      }
    })
  });
}

let createTableGroup = () => {
  db.serialize(function(){
    db.run(createGroup, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('Sukses');
      }
    })
  });
}

let createTableContactGroup = () => {
  db.serialize(function(){
    db.run(createContactGroup, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('Sukses');
      }
    })
  });
}

let seedData = () => {
  db.serialize(function(){
    for (var i = 0; i < dataContact.length; i++) {
      db.run(`INSERT INTO contact (nama,perusahaan,email,noTelepon) VALUES ('${dataContact[i].nama}','${dataContact[i].perusahaan}','${dataContact[i].email}','${dataContact[i].noTelepon}')`,function(err){
        if(err){
          console.log(err);
        } else {
          console.log('Sukses memasukkan data contact');
        }
      });
    }
    for (var i = 0; i < dataGroup.length; i++) {
        db.run(`INSERT INTO grup (namaGrup) VALUES ('${dataGroup[i].namaGrup}')`,function(err){
          if(err){
            console.log(err);
          } else {
            console.log('Sukses memasukkan data grup');
          }
        });
    }
    for (var i = 0; i < dataContactGroup.length; i++) {
      db.run(`INSERT INTO contactGroup (idContact,idGroup) VALUES ('${dataContactGroup[i].idContact}','${dataContactGroup[i].idGroup}')`,function(err){
        if(err){
          console.log(err);
        } else {
          console.log('Sukses memasukkan data contact grup');
        }
      });
    }
  })
}

replServer.context.createTableContact = createTableContact;
replServer.context.createTableGroup = createTableGroup;
replServer.context.createTableContactGroup = createTableContactGroup;
replServer.context.seedData = seedData;
