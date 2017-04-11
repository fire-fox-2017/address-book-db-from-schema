
var ContactGroup = require('./contact-group');


let cg = new ContactGroup();

const repl = require('repl');
const replServer = repl.start({prompt: '$ '});

replServer.context.a = cg;
