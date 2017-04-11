const sqlite = require('sqlite3').verbose();

let file = 'address_book.db';
var db = new sqlite.Database(file);


class Group{
  constructor(){

  }

  //
  static create(group_name){
    db.run(`INSERT INTO groups(group_name) VALUES('${group_name}')`, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('Berhasil Insert Data');
      }
    });
  }

  static update(id, value){
    db.run(`UPDATE groups SET group_name='${value}' WHERE id=${id}`, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('Berhasil Update');
      }
    });
  }

  static delete(id){
    db.serialize(function(){
      db.run(`DELETE FROM groups WHERE id=${id}`, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('Berhasil Delete Contact');
        }
      });

      db.run(`UPDATE groupscontacts SET is_deleted='true' WHERE group_id=${id}`, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('Berhasil Update GroupsContacts');
        }
      });
    })
  }
  //
  // static show(id){
  //   db.serialize(function(){
  //     db.each(`SELECT * FROM contacts where id=${id}`, function(err, row){
  //       if(err){
  //         console.log(err);
  //       }
  //       else{
  //         console.log(row);
  //       }
  //     });
  //
  //     db.each(`SELECT * FROM groupscontacts where contact_id=${id} AND is_deleted='false'`, function(err, row){
  //       if(err){
  //         console.log(err);
  //       }
  //       else{
  //         db.each(`SELECT group_name FROM groups where id=${row.group_id}`, function(err, row){
  //           if(err){
  //             console.log(err);
  //           }
  //           else{
  //             console.log(row.group_name);
  //           }
  //         });
  //       }
  //     });
  //   })
  // }
}

export default Group