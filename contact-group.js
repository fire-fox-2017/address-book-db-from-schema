const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./data.db');

class ContactGroup {
  constructor(obj) {
    this.id = obj.id || null;
    this.idContact = obj.idContact;
    this.idGroup = obj.idGroup;
  }
  save() {
    var obj = this;
    if (this.id == null) {
      db.serialize(function() {
        db.run(`INSERT INTO contactGroup (idContact, idGroup) VALUES ('${obj.idContact}','${obj.idGroup}')`, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Data contact grup berhasil masuk');
          }
        });
        db.all(`Select max(id) as id from contactGroup`, function(err, data) {
          if (err) {
            console.log(err);
          } else {
            obj.id = data.id;
          }
        })
      })
    } else {
      db.serialize(function() {
        db.run(`UPDATE contactGroup SET idContact = '${obj.idContact}' AND idGroup = '${obj.idGroup}' where id = ${obj.id}`, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Data contact grup berhasil diupdate');
          }
        })
      })
    }
  }

  update(obj) {
    var id = obj.id;
    var idContact = obj.idContact;
    var idGroup = obj.idGroup;

    db.serialize(function() {
      db.run(`UPDATE contactGroup SET idContact = '${idContact}', idGroup = '${idGroup}' where id = '${obj.id}'`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Data contactGroup berhasil diupdate');
        }
      })
    })

  }

  delete(id) {
    // console.log(id);
    db.serialize(function() {
      db.run(`DELETE FROM contactGroup WHERE id = '${id}'`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Data contactGroup berhasil dihapus');
        }
      })
    })
  }

  showList(){
    db.serialize(function(){
      db.each(`select * from contactGroup`, function(err, row){
        if(err){
          console.log(err);
        } else {
           console.log(JSON.stringify(row));
        }
      });
    })
  }
}

export default ContactGroup
