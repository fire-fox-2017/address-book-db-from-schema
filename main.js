const repl = require('repl');

const Contact = require('./contact');
const ContactGroup = require('./contact-group');
const Group = require('./group');


let help = () => {
    console.log(`insertGroup('name')\nupdateGroup('id', 'name')\ndeleteGroup('id')\nshowGroup()\ninsertContact('name', 'company','phone','email')\nupdateContact('id','name', 'company','phone','email')\ndeleteContact('id')\showContact()\ninsertContactIdToGroupId('contacts_id', 'groups_id')`);
    // return true;
}

// console.log(Contact.test);
const replServer = repl.start({prompt: '> '})

replServer.context.help = help

replServer.context.addGroup = Group.add
replServer.context.updateGroup = Group.update
replServer.context.deleteGroup = Group.delete
replServer.context.showGroup = Group.show


replServer.context.addContact = Contact.add
replServer.context.updateContact = Contact.update
replServer.context.deleteContact = Contact.delete
replServer.context.showContact = Contact.show
// replServer.context.test = Contact.test

//for execute ContactGroup
replServer.context.addContactGroup = ContactGroup.add
