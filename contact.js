const sqlite = require('sqlite3').verbose();
let fileName = "addressbook.db";
var db = new sqlite.Database(fileName);

class Contact {
  constructor() {

  }

  static addContact(name, company, email, phone_number){
    let QUERY_ADD_CONTACT = `INSERT INTO contacts (name, company, email, phone_number) VALUES (?,?,?,?)`
    if (Contact.emailCheck(email) && Contact.phoneNumberCheck(phone_number)) {
      db.serialize(function() {
        db.run(QUERY_ADD_CONTACT, [name, company, email, phone_number], function(err){
          if (err) {
            console.log(err);
          } else {
            console.log(`Contact with name : ${name} saving success`);
          }
        })
      })
    }

  }

  static showAll(){
    let QUERY_SHOW_ALL = `SELECT contacts.*, groups.name as group_name FROM contacts LEFT JOIN groups_contacts ON contacts.id = groups_contacts.contact_id LEFT JOIN  groups ON groups_contacts.group_id = groups.id`
      db.each(QUERY_SHOW_ALL, function(err, row){
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
  }

  static deleteContact(id){
    let QUERY_DELETE = `DELETE FROM contacts WHERE id = ${id}`
    db.serialize(function() {
    db.run(QUERY_DELETE, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(`Contact with id : ${id} was deleted`);
      }
    })
    })
  }

  static updateContact(id, fieldName, newValue){
    let QUERY_UPDATE = `UPDATE contacts SET ${fieldName} = "${newValue}" WHERE id = (?)`
    if (fieldName == 'email') {
      if (Contact.emailCheck(newValue)) {
        db.serialize(function() {
        db.run(QUERY_UPDATE, [id], function(err){
          if (err) {
            console.log(err);
          } else {
            console.log(`Data with id : ${id} was updated`);
          }
        })
        })
      }
    } else if (fieldName == 'email') {
      if (Contact.phoneNumberCheck(newValue)) {
        db.serialize(function() {
        db.run(QUERY_UPDATE, [id], function(err){
          if (err) {
            console.log(err);
          } else {
            console.log(`Data with id : ${id} was updated`);
          }
        })
        })
      }
    } else {
      db.serialize(function() {
      db.run(QUERY_UPDATE, [id], function(err){
        if (err) {
          console.log(err);
        } else {
          console.log(`Data with id : ${id} was updated`);
        }
      })
      })
    }

  }

  static emailCheck(email) {
    let regex = /\w.*@\w.*./;
      if (!regex.test(email)) {
          return false;
      } else {
          return true;
      }
  }

  static phoneNumberCheck(phone_number) {
      if (phone_number.length < 10 || phone_number.length > 13) {
          return false
      } else {
          return true
      }
  }

  static help() {
        console.log('Add contact : addContact(name, company, email, phone_number)');
        console.log('update contact : updateContact(id, fieldName, newValue)');
        console.log('delete contact : deleteContact(id)');
        console.log('show all contact : showall()');
        console.log('show contact by filter : showbyfilter(field,valueOf)');
        console.log('add group : addGroup(groupName)');
        console.log('delete group : deletegroup(id)');
        console.log('change group name : changegroupname(id,name)');
        console.log('add conection : addconection(group_id,contact_id)');
        console.log('change conection : changeconection(id,groupid,contactid)');
        console.log('delete conection : deleteconection(id)');
        console.log('help : help()');
    }

}

export default Contact