class Group {
  constructor (args) {
    this.id = null;

    this.name = ""
    if(args && args.hasOwnProperty('name'))
      this.name = args['name'];

    this.is_saved = false;
  }


  save() {
    if(this.is_saved) {
      // update
      let query = `UPDATE groups SET name = '${this.name}'`

      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            console.log('Group has been updated.');
          }
        });
      });



    }
    else {
      let user = this;
      // if not exist, insert
      let query = `INSERT INTO Groups(name) VALUES ( '${this.name}')`;
      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            user._id = this.lastID; // does not work!!
            user.is_saved = true;
            console.log("user._id", user._id);

            console.log('Group has been inserted into DB.');
          }
        });

      });

    }
  }


} // end of Group class
