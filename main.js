import Contact from './contact.js';
import Group from './group.js';
import ContactGroup from './contact-group.js';

const repl = require('repl');
let replServer = repl.start({prompt : '> '});

replServer.context.Contact = Contact;
replServer.context.Group = Group;
replServer.context.ContactGroup = ContactGroup;
