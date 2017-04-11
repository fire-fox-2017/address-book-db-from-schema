const repl = require('repl');

const Contact = require('./contact');
const Contact_group = require('./contact_group');
const Group = require('./group');


let help = () => {
    console.log(`insertGroup('name')\nupdateGroup('id', 'name')\ndeleteGroup('id')\nshowGroup()\ninsertContact('name', 'company','phone','email')\nupdateContact('id','name', 'company','phone','email')\ndeleteContact('id')\showContact()\ninsertContactIdToGroupId('contacts_id', 'groups_id')`);
    // return true;
}

// console.log(Contact.test);
const replServer = repl.start({prompt: '> '})

replServer.context.help = help
//for execute group
replServer.context.insertGroup = Group.addGroups
replServer.context.updateGroup = Group.updateGroups
replServer.context.deleteGroup = Group.deleteGroups
replServer.context.showGroup = Group.showAll

//for execute contact
replServer.context.insertContact = Contact.addContact
replServer.context.updateContact = Contact.updateContacts
replServer.context.deleteContact = Contact.deleteContacts
replServer.context.showContact = Contact.showAll
// replServer.context.test = Contact.test

//for execute contact_group
replServer.context.insertContactGroup = Contact_group.addContacts_groups