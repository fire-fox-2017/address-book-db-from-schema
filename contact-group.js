const sqlite = require('sqlite3').verbose();
let fileName = "addressbook.db";
var db = new sqlite.Database(fileName);

class ContactGroup {
  constructor() {

  }

  static addRelation(contact_id, group_id){
    let ADD_RELATION_QUERY = `INSERT INTO groups_contacts (contact_id, group_id) VALUES (?,?)`
    db.serialize(function() {
    db.run(ADD_RELATION_QUERY, [contact_id, group_id], function(err){
      if (err) {
        console.log(err);
      } else{
        console.log(`Relationship created, Cieee...`);
      }
    })
    })
  }

  static changeRelationship(idRelationship, contactId, groupId){
    let UPDATE_RELATIONSHIP_QUERY = `UPDATE groups_contacts SET group_id = ${groupId},  contact_id = ${contactId} WHERE id = ${idRelationship}`
    db.serialize(function() {
    db.run(UPDATE_RELATIONSHIP_QUERY, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Releationship changed! Hahaha`);
      }
    })
    })
  }

  static deleteRelationship(idRelationship){
    let DELETE_RELATIONSHIP_QUERY = `DELETE FROM groups_contacts WHERE id = ${idRelationship}`
    db.serialize(function() {
    db.run(DELETE_RELATIONSHIP_QUERY, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(`Ciah, your Relationship is broken now! Huahahaha`);
      }
    })
    })
  }
}

export default ContactGroup