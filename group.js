const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./data.db');

class Group {
  constructor(obj) {
    this.id = obj.id || null;
    this.namaGrup = obj.namaGrup;
  }

  showListGroup() {
    db.serialize(function() {
      db.each(`select * from grup`, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(JSON.stringify(row));
        }
      })
    })
  }

  showDetailGroup(id) {
    db.serialize(function() {
      db.each(`SELECT g.id, g.namaGrup, c2.nama FROM grup g,contactGroup c1,contact c2 where g.id = c1.idGroup and c2.id = c1.idContact and g.id = '${id}'`, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(JSON.stringify(row));
        }
      })
    })
  }

  save() {
    var obj = this;
    if(this.id == null){
      db.serialize(function(){
        db.run(`INSERT INTO grup (namaGrup) VALUES ('${obj.namaGrup}')`, function (err){
          if(err){
            console.log(err);
          } else {
            console.log('Data grup berhasil masuk');
          }
        });
        db.all(`Select max(id) as id from grup`, function(err, data){
          if(err){
            console.log(err);
          } else {
            obj.id = data.id;
          }
        })
      })
    } else {
      db.serialize(function(){
        db.run(`UPDATE grup SET namaGrup = '${obj.namaGrup}' where id = ${obj.id}`, function (err){
          if(err){
            console.log(err);
          } else {
            console.log('Data grup berhasil diupdate');
          }
        })
      })
    }
  }

  update(obj) {
    var id = obj.id;
    var namaGrup = obj.namaGrup;

    db.serialize(function() {
      db.run(`UPDATE grup SET namaGrup = '${namaGrup}' where id = '${id}'`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Data group berhasil diupdate');
        }
      })
    })

  }

  delete(id) {
    db.serialize(function() {
      db.run(`DELETE FROM contactGroup WHERE idGroup = '${id}'`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Data group di contactGroup berhasil dihapus');
        }
      })
    })
    db.serialize(function() {
      db.run(`DELETE FROM grup WHERE id = '${id}'`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Data group berhasil dihapus');
        }
      })
    })
  }
}

  export default Group
