const sqlite = require('sqlite3').verbose();
var file = 'address_book.db';
var db = new sqlite.Database(file);

class Contact {
  constructor(options) {
    this.nama = options.nama;
    this.perusahaan = options.perusahaan;
    this.nomor_telpon = options.nomor_telpon;
    this.email = options.email;
    this.id = null;
  }
  save() {
    let obj = this;
    if (Contact.validate(obj)) {
      if (this.id == null) {
        db.serialize(function() {
          db.run(`INSERT INTO contact (nama,perusahaan,nomor_telpon,email) VALUES ('${obj.nama}','${obj.perusahaan}','${obj.nomor_telpon}','${obj.email}')`, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Contact Insert Row..");
            }
          });
          db.all(`Select max(id) as id from contact`, function(err, raw) {
            if (err) {
              console.log(err);
            } else {
              obj.id = raw[0].id;
              db.run(`INSERT INTO contact_group (contact_id,group_id) VALUES (${obj.id},${1})`, function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Automatic Group Contact Insert Row..");
                }
              });
            }
          });
        });
      } else {
        db.serialize(function() {
          db.run(`UPDATE contact SET nama='${obj.nama}', perusahaan='${obj.perusahaan}', nomor_telpon='${obj.nomor_telpon}', email='${obj.email}' WHERE id=${obj.id}`, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Contact Update Row..");
            }
          });
        });
      }
    } else {
      console.log("Contact save failed..");
    }
  }
  static validate(obj) {
    let result = true;
    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!obj.email.match(pattern)) {
      console.log("ERR :email");
      result = false;
    }
    if (obj.nomor_telpon.match(/[a-zA-Z]+/g) !== null) {
      console.log("ERR : nomor telpon tidak boleh mengandung huruf");
      result = false;
    } else if (obj.nomor_telpon.length > 12) {
      console.log("ERR : panjang nomor telpon tidak boleh melebihi 12 character");
      result = false;
    }
    return result;
  }
  static create(nama, perusahaan, nomor_telpon, email) {
    if (this.validate({
        "email": email,
        "nomor_telpon": nomor_telpon
      })) {
      db.serialize(function() {
        db.run(`INSERT INTO contact (nama,perusahaan,nomor_telpon,email) VALUES ('${nama}','${perusahaan}','${nomor_telpon}','${email}')`, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Contact Insert Row..');
          }
        });
        db.all(`Select max(id) as id from contact`, function(err, raw) {
          if (err) {
            console.log(err);
          } else {
            let temId = raw[0].id;
            db.run(`INSERT INTO contact_group (contact_id,group_id) VALUES (${temId},${1})`, function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log("Automatic Contact Group Insert Row..");
              }
            });
          }
        });
      });
    } else {
      console.log("Contact create failed..");
    }
    return 'Query Insert.';
  }
  static update(id, nama, perusahaan, nomor_telpon, email) {
    if (this.validate({
        "email": email,
        "nomor_telpon": nomor_telpon
      })) {
      db.serialize(function() {
        db.run(`UPDATE contact SET nama='${nama}', perusahaan='${perusahaan}', nomor_telpon='${nomor_telpon}', email='${email}' WHERE id=${id}`, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Contact Update Row..');
          }
        });
      });
    } else {
      console.log("Contact create failed..");
    }
    return 'Query Update.';
  }
  static show() {
    db.serialize(function() {
      db.each(`SELECT A.id as id, A.nama as nama, A.perusahaan as perusahaan, A.nomor_telpon as nomor_telpon, A.email as email, C.nama_group as namaG FROM contact A, contact_group B, groups C where A.id=B.contact_id AND B.group_id=C.id`, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(`${row.id} | ${row.nama} | ${row.perusahaan} | ${row.nomor_telpon} | ${row.email} |${row.namaG}`);
        }
      });
    });
    return 'Query Show.';
  }
  static delete(id) {
    db.serialize(function() {
      db.run(`DELETE FROM contact WHERE id=${id};`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Delete Contact Succes.');
        }
      });
    });
    db.serialize(function() {
      db.run(`DELETE FROM contact_group WHERE contact_id=${id};`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Automatic Delete Contact Group Succes.');
        }
      });
    });
    return 'Query Delete.';
  }
}

export default Contact
