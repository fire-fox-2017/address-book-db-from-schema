import Contact from "./contact.js"
import Group from "./group.js"
import ContactGroup from "./contact-group.js"
import Setup from "./setup.js"

const repl = require('repl');
const replServer = repl.start({
    prompt: '> '
});


replServer.context.Contact = Contact;
replServer.context.Group = Group;
replServer.context.ContactGroup = ContactGroup;
replServer.context.setup = new Setup();
