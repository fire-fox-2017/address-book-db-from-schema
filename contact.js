const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./data.db');

class Contact{
  constructor(objContact){
    this.nama = objContact.nama;
    this.perusahaan = objContact.perusahaan || null;
    this.email = objContact.email || null;
    this.noTelepon = objContact.noTelepon || null;
    this.id = null;
  }

  save(){
    var obj = this;
    if(this.validasi(obj)){
      if(this.id == null){
        db.serialize(function(){
          db.run(`INSERT INTO contact (nama,perusahaan,email,noTelepon) VALUES ('${obj.nama}','${obj.perusahaan}','${obj.email}','${obj.noTelepon}')`, function (err){
            if(err){
              console.log(err);
            } else {
              console.log('Data contact berhasil masuk');
            }
          });
          db.all(`Select max(id) as id from contact`, function(err, data){
            if(err){
              console.log(err);
            } else {
              obj.id = data.id;
              // console.log(data);
            }
          })
        })
      } else {
        db.serialize(function(){
          db.run(`UPDATE contact SET nama = '${obj.nama}', perusahaan = '${obj.perusahaan}', email = '${obj.email}', noTelepon = '${obj.noTelepon}' where id = '${obj.id}'`, function (err){
            if(err){
              console.log(err);
            } else {
              console.log('Data contact berhasil diupdate');
            }
          })
        })
      }
    }
  }

  validasi(obj){

    if(this.validasiEmail(obj.email) && this.validasiNoTelepon(obj.noTelepon)){
      return true;
    } else {
      console.log('Cek format email dan no telepon');
      return false;
    }
  }

  validasiEmail(email){
    var hasil = true;
    if(/^\w+@\w+\.[a-z]{3}$/gi.test(email) ||  email == null){
      hasil = true;
    } else {
      hasil = false;
    }

    return hasil;
  }

  validasiNoTelepon(noTelepon){
    var hasil = true;
    if(/\d{3}-\d{3}-\d{4}/g.test(noTelepon) ||  noTelepon == null){
      hasil = true;
    } else {
      hasil = false;
    }

    return hasil;
  }

  update(obj){
    var id = obj.id;
    var nama = obj.nama;
    var perusahaan = obj.perusahaan;
    var email = obj.email;
    var noTelepon = obj.noTelepon;

    if(this.validasiEmail(email) && this.validasiNoTelepon(noTelepon)){
      db.serialize(function(){
        db.run(`UPDATE contact SET nama = '${nama}', perusahaan = '${perusahaan}', email = '${email}', noTelepon = '${noTelepon}' where id = '${obj.id}'`, function(err){
          if(err){
            console.log(err);
          } else {
            console.log('Data contact berhasil diupdate');
          }
        })
      })
    }
  }

  showListContact(){
    db.serialize(function(){
      db.each(`select c1.id,c1.nama,c1.perusahaan,c1.email,c1.noTelepon, g.namaGrup
                from contact c1
                left join contactGroup c2
                on c1.id = c2.idContact
                left join grup g
                on g.id = c2.idGroup`, function(err, row){
        if(err){
          console.log(err);
        } else {
           console.log(JSON.stringify(row));
        }
      });
    })
  }

  showDetailContact(id){
    db.serialize(function(){
      db.each(`SELECT * FROM contact WHERE id = '${id}'`, function(err, row){
        if(err){
          console.log(err);
        } else {
          console.log(JSON.stringify(row));
        }
      })
    })
  }

  delete(id){
    db.serialize(function() {
      db.run(`DELETE FROM contact WHERE id = '${id}'`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Data contact berhasil dihapus');
        }
      })
    })
    db.serialize(function() {
      db.run(`DELETE FROM contactGroup WHERE idContact = '${id}'`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Data contact di contactGroup berhasil dihapus');
        }
      })
    })
  }
}



export default Contact
