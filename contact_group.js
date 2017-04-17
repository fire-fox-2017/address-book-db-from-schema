
'use strict'

const sqlite3 = require('sqlite3').verbose();
const file = 'address.db'
const db = new sqlite3.Database(file)

class Contacts_groups {
  static addContactGroup(contacts_id,groups_id){
    db.serialize(()=>{
      db.run(`INSERT INTO Contacts_Groups (contact_id, group_id) VALUES ('${contacts_id}','${groups_id}');`, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('contact_group data added');
        }
      })
    })
    return true
  }
  static updateContactGroup(id, contact_id, group_id){
    db.serialize(()=>{
      db.run(`UPDATE Contacts_Groups SET contact_id = '${contact_id}', group_id = '${group_id}' WHERE ID = ${id};`, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('contact_group data updated');
        }
      })
    })
    return true
  }
  static deleteContactGroup(id){
    db.serialize(()=>{
      db.run(`DELETE FROM Contacts_Groups WHERE ID = ${id};`, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('contact_group data deleted');
        }
      })
    })
    return true
  }

  static showContactGroup(){
    db.serialize(()=>{
      db.all(`SELECT * FROM Contacts_Groups`, (err, data)=>{
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      })
    })
  return true;
  }
}

export default Contacts_groups
