const repl = require('repl');

const Contact = require('./contact');
const Group_contacts = require('./contact-group');
const Group = require('./group');


let help = () => {
    console.log(`insertGroup('name')\nupdateGroup('name','id')\ndeleteGroup('id')\ntampilkanGroup()\ninsertContact('name', 'company','phone','email')\nupdateContact('name', 'company','phone','email','id')\ndeleteContact('id')\ntampilkanContact()\ninsertContactIdToGroupId('contacts_id', 'groups_id')`);
    // return true;
}

// console.log(Contact.test);
const replServer = repl.start({prompt: '> '})

replServer.context.help = help
//for execute group
replServer.context.insertGroup = Group.addGroups
replServer.context.updateGroup = Group.updateGroups
replServer.context.deleteGroup = Group.deleteGroups
replServer.context.tampilkanGroup = Group.tampilkanSemua

//for execute contact
replServer.context.insertContact = Contact.addContact
replServer.context.updateContact = Contact.updateContacts
replServer.context.deleteContact = Contact.deleteContacts
replServer.context.tampilkanContact = Contact.tampilkanSemua
// replServer.context.test = Contact.test

//for execute contact_group
replServer.context.insertGroupContact = Group_contacts.addgroup_contacts
