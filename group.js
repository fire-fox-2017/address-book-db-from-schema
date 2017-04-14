
import ContactGroup from "./contact-group.js";

const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

class Group {
  constructor(object) {
    this.group_name = object.group_name;
    this.id = object.id || null;
  }
}


export default Group
