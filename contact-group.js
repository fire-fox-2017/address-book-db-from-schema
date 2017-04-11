"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = 'student.db';
var db = new sqlite.Database(file);