const repl = require('repl');

const Contact = require('./contact');
const Group_contacts = require('./contact-group');
const Group = require('./group');


let help = () => {
    console.log(`insertGroup('name')`);
    console.log(`updateGroup('name','id')`);
    console.log(`deleteGroup('id')`);
    console.log(`viewGroup()`);

    console.log(`insertContact('name', 'company','phone','email')`);
    console.log(`updateContact('name', 'company','phone','email','id')`);
    console.log(`deleteContact('id')`);
    console.log(`viewContact()`);

    console.log(`insertContactIdToGroupId('contacts_id', 'groups_id')`);
}

const replServer = repl.start({prompt: '> '})

replServer.context.help = help

//for execute group
replServer.context.insertGroup = Group.addGroups
replServer.context.updateGroup = Group.updateGroups
replServer.context.deleteGroup = Group.deleteGroups
replServer.context.viewGroup = Group.viewAllGroup

//for execute contact
replServer.context.insertContact = Contact.addContact
replServer.context.updateContact = Contact.updateContacts
replServer.context.deleteContact = Contact.deleteContacts
replServer.context.viewContact = Contact.viewAllContact
// replServer.context.test = Contact.test

//for execute contact_group
replServer.context.insertGroupContact = Group_contacts.addgroup_contacts
