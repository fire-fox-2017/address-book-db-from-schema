'use strict'

const repl = require('repl');
const replServer = repl.start({prompt :'>>'})
const fs = require('fs');
let dummy_Contact = JSON.parse(fs.readFileSync('contacts.json'), ('utf-8'));
let dummy_Group = JSON.parse(fs.readFileSync('groups.json'), ('utf-8'));
let dummy_Cont_Group = JSON.parse(fs.readFileSync('contact_group.json'), ('utf-8'));

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('address_book.db');


const Contact = `CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL, company VARCHAR, phone_number INTEGER, email TEXT)`;
const Group = `CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, group_name VARCHAR NOT NULL)`;
const Cont_Group = `CREATE TABLE IF NOT EXISTS contact_groups(id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER)`;


let createTable = () =>{
	db.serialize(() =>{
		db.run(Contact, (err)=>{
			if(err){
				console.log(err);
			}else{
				console.log("Create Table Contact Success");
			}
	})

		db.run(Group, (err)=>{
			if(err){
				console.log(err);
			}else{
				console.log("Create Table Group Success");
			}
	})

		db.run(Cont_Group, (err)=>{
			if(err){
				console.log(err);
			}else{
				console.log("Create Table ID Contact & Group Success");
			}
	})
})
}

//SEED DATA
// Contact
let seedDataContact = () =>{
	for(let i = 0; i < dummy_Contact.length ; i++){
		let seedData = `INSERT INTO contacts (name, company, phone_number, email) VALUES ('${dummy_Contact[i].name}', '${dummy_Contact[i].company}', '${dummy_Contact[i].phone_number}', '${dummy_Contact[i].email}')`;

		db.serialize(() =>{
			db.run(seedData, (err)=>{
				if(err){
					console.log(err);
				}else{
					console.log('Seed Data Contact Success!');
				}
			})
		})
	}
}

// Group
let seedDataGroup = () =>{
	for(let i = 0; i < dummy_Group.length ; i++){
		let seedData = `INSERT INTO groups (group_name) VALUES ('${dummy_Group[i].name}')`;

		db.serialize(() =>{
			db.run(seedData, (err)=>{
				if(err){
					console.log(err);
				}else{
					console.log('Seed Data Group Success!');
				}
			})
		})
	}
}

// Bridge Contact & Group
let seedContGroup = () =>{
	for(let i = 0; i < dummy_Cont_Group.length ; i++){
		let seedData = `INSERT INTO contact_groups (contact_id, group_id) VALUES ('${dummy_Cont_Group[i].contact_id}', '${dummy_Cont_Group[i].group_id}')`;

		db.serialize(() =>{
			db.run(seedData, (err)=>{
				if(err){
					console.log(err);
				}else{
					console.log('Seed Data ID Group & Contact Success!');
				}
			})
		})
	}
}


replServer.context.createTable = createTable;
replServer.context.seedDataContact = seedDataContact;
replServer.context.seedDataGroup = seedDataGroup;
replServer.context.seedContGroup = seedContGroup;
