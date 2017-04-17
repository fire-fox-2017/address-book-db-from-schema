'use strict'

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('address_book.db');

class Contact_groups{
constructor(){

}
	static addContactGroup(contact_id, group_id){
			db.serialize(() =>{
				let query = `INSERT INTO contact_groups (contact_id, group_id) VALUES ('${contact_id}', '${group_id}')`;
				db.run(query, (err)=>{
				if (err){
					console.log(err);
				}else{
					console.log('Add Contact id & Group id Success')
				}
			})
		})
			return true;
	}

	static updateContactGroup(id, contact_id, group_id){
			db.serialize(() =>{
				let query = `UPDATE contact_groups SET contact_id = '${contact_id}', group_id = '${group_id}' WHERE ID = ${id};`
				db.run(query, (err)=>{
				if (err){
					console.log(err);
				}else{
					console.log('Update Data Contact Group Success')
				}
			})
		})
			return true;
	}

	static deleteContactGroup(id){
		db.serialize(() =>{
			let query = `DELETE FROM contact_groups WHERE ID = ${id}`
			db.run(query, (err)=>{
				if(err){
					console.log(err);
				}else{
					console.log(`Delete contact_id ${id}`)
				}
			})
		})
		return true;
	}

	static showAll(){
		db.serialize(()=>{
			let query =`SELECT * FROM contact_groups`;
			db.all(query, (err, data)=>{
				if (err){
					console.log(err);
				}else{
					console.log(data);
				}
			})
		})
	}
}


module.exports = Contact_groups
