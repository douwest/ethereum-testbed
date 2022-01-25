const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'insert mnemonic phrase here',
    'https://rinkeby.infura.io/v3/a9662b484ff9463ea5413aeead71073a'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0]
    console.log('Attempting to deploy from account', account)

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['My First Message']})
        .send({ gas: 1_000_000, from: account});

    console.log('Contract was deployed to', result.options.address);
};

deploy();