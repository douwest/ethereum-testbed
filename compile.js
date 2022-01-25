const path = require('path');
const fs = require('fs');
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// Export the compiled contents of solidity out of this module
module.exports = solc.compile(source, 1).contracts[':Inbox'];