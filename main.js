import Contact from './contact.js'
import Group from './group.js'
import ContactGroup from './contact-group.js'
const repl = require('repl')

let r = repl.start(' > ')
r.context.addContact = Contact.addContact
r.context.showAllContact = Contact.showAll
r.context.deleteContact = Contact.deleteContact
r.context.updateContact = Contact.updateContact
r.context.help = Contact.help
r.context.showAllGroup = Group.showAll
r.context.addGroup = Group.addGroup
r.context.changeGroupName = Group.changeGroupName
r.context.deleteGroup = Group.deleteGroup
r.context.addRelation = ContactGroup.addRelation
r.context.changeRelationship = ContactGroup.changeRelationship
r.context.deleteRelationship = ContactGroup.deleteRelationship
