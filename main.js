const repl = require('repl');
const replServer = repl.start({prompt : '>>'})

const Contact = require('./contact');
const Group = require('./group');
const Contact_group = require('./contact-group');

let help = ()=>{
  console.log(` insertContact (name, company, phone_number, email)\n updateContact(id, name, company, phone_number, email)\n deleteContact(id)\n showAllContact\n insertGroup(group_name)\n updateGroup(id, group_name)\n deleteGroup(id)\n showAllGroup\n insertContactGroup(contact_id, group_id)\n updateGroup(id, contact_id, group_id)\n deleteContactGroup(id)\n showAllContactGroup`)
}


replServer.context.help = help;
//Contact Method

replServer.context.insertContact = Contact.addContact;
replServer.context.updateContact = Contact.updateContact;
replServer.context.deleteContact = Contact.deleteContact;
replServer.context.showAllContact = Contact.showAll;


//Group Method

replServer.context.insertGroup = Group.addGroup;
replServer.context.updateGroup = Group.updateGroup;
replServer.context.deleteGroup = Group.deleteGroup;
replServer.context.showAllGroup = Group.showAll;


//contact Group
replServer.context.insertContactGroup = Contact_group.addContactGroup;
replServer.context.updateContactGroup = Contact_group.updateContactGroup;
replServer.context.deleteContactGroup = Contact_group.deleteContactGroup;
replServer.context.showAllContactGroup = Contact_group.showAll;
