"use strict"

const Contact = require('./Contact')
const Contacts_group = require('./Contacts_group')
const Group = require('./Group')

let help = () => {
  console.log('======================================')
  console.log(`insertGroup('name')`)
  console.log(`updateGroup('id', 'name')`);
  console.log(`deleteGroup('id')`);
  console.log(`showGroup()`);
  console.log(`insertContact('name', 'company','phone','email')`);
  console.log(`updateContact('id','name', 'company','phone','email')`);
  console.log(`deleteContact('id')`);
  console.log(`showContact()`);
  console.log(`insertContactIdToGroupId('contacts_id', 'groups_id')`);
}

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
