const repl = require('repl');
const replServer = repl.start({prompt: '> '});

import importedContact from "./contact.js";
import importedContactGroup from "./contact_group.js";
import importedGroup from "./group.js";

let help = () => {
    console.log(`insertGroup('name')\nupdateGroup('id', 'name')\ndeleteGroup('id')\nshowGroup()\ninsertContact('name', 'company','phone','email')\nupdateContact('id','name', 'company','phone','email')\ndeleteContact('id')\nshowContact()\ninsertContactIdToGroupId('contacts_id', 'groups_id')`);
}


replServer.context.help = help;
replServer.context.insertGroup = importedGroup.addGroup;
replServer.context.updateGroup = importedGroup.updateGroup;
replServer.context.deleteGroup = importedGroup.deleteGroup;
replServer.context.showGroup = importedGroup.showGroup;

replServer.context.insertContact = importedContact.addContact;
replServer.context.updateContact = importedContact.updateContact;
replServer.context.deleteContact = importedContact.deleteContact;
replServer.context.showContact = importedContact.showContact;

replServer.context.insertContactIdToGroupId = importedContactGroup.addContactGroup;
