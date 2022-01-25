const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const {abi, evm} = require('../compile');
const defaultMessage = 'Hello I\'m a cool contract!';

let accounts;
let inbox;

beforeEach(async () => {
    // Retrieve a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of these accounts to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(evm))
        .deploy({
            data: evm.bytecode.object,
            arguments: ['Hi there!'],
        })
        .send({from: accounts[0], gas: 1_000_000})
});

describe('Inbox', () => {
    it('should deploy the contract', () => {
        assert.ok(inbox.options.address);
    });

    it('should have a default message', async() => {
        const message = await inbox.methods.getMessage().call();
        assert.equal(message, defaultMessage);
    });

    it('should have an updated value after setMessage', async() => {
        await inbox.methods.setMessage('hi').send({from: accounts[0]});
        const response = await inbox.methods.getMessage().call();
        assert.equal(response, 'hi');
    });
});