"use strict"

import Contact from "./contact.js";
import ContactGroup from "./contact-group.js";
import Group from "./group.js";

const repl = require('repl');
let rp = repl.start('>> ');
rp.context.Contact = Contact;
rp.context.ContactGroup = ContactGroup;
rp.context.Group = Group;