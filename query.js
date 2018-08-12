const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
const web3 = new Web3(ganache.provider());

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Deploying from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: '0x' + bytecode, arguments: ['test']})
  .send({gas: '1000000', from: accounts[0]});

  console.log("Deployed to address", result.options.address);
};
deploy();

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let smartPlug;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  smartPlug = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: '0x' + bytecode})
  .send({from: accounts[0], gas: '1000000'});
});

describe('smartPlugPayment', () => {
  it('contract deployed', () => {
    assert.ok(smartPlug.options.address);
  });

  it('deposit ether', async () => {
    await smartPlug.methods.deposit().send({
      from: accounts[0],
      value: web3.utils.toWei('0.01', 'ether')
    });

    const balance = await smartPlug.methods.getBalance().call({
      from: accounts[0]
    })

    assert.equal('0.01', balance);
  })
});
