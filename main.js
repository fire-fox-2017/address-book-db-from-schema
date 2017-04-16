
const repl = require('repl');

const Contact = require('./contact');
const Contact_group = require('./contact-group');
const Group = require('./group');


let help = () => {
    console.log(`createContact('name', 'company','phone','email')`);
    console.log(`updateContact('id','name', 'company','phone','email')`);
    console.log(`deleteContact('id')`);
    console.log(`showContact()`);
    console.log(`createGroup('name')`);
    console.log(`updateGroup('id', 'name')`);
    console.log(`deleteGroup('id')`);
    console.log(`showGroup()`);
    console.log(`assignContactToGroup('contacts_id', 'groups_id')`);
}

// console.log(Contact.test);
const replServer = repl.start({prompt: '> '})

replServer.context.help = help
// Command for executing Groups
replServer.context.createGroup = Group.addGroups
replServer.context.updateGroup = Group.updateGroups
replServer.context.deleteGroup = Group.deleteGroups
replServer.context.showGroup = Group.showAll

// Command for executing Contacts
replServer.context.createContact = Contact.addContact
replServer.context.updateContact = Contact.updateContacts
replServer.context.deleteContact = Contact.deleteContacts
replServer.context.showContact = Contact.showAll
// replServer.context.test = Contact.test

//for execute contact_group
replServer.context.assignContactToGroup = Contact_group.addContactsGroups
