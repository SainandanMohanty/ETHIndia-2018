const mod = require('./deploy');

let balance;
let smartPlug;
let accounts;
let web3;

const init = async () => {
  smartPlug = await mod.contract;
  web3 = await mod.returnweb3;
  accounts = await web3.eth.getAccounts();
};

const deposit = async (index) => {
  await smartPlug.methods.deposit().send({
    from: accounts[index],
    value: 1000000
  });
  await console.log("Deposit successful")
}

const getBalance = async () => {
  balance = await smartPlug.methods.getBalance().call({
    from: accounts[0]
  });
  await console.log(balance);
}

const payUser = async (address[]) => {
  await smartPlug.methods.payUser.call({
    from: accounts[0]
  });
  console.log("Users paid");
}

const test = async () => {
  await init();
  await deposit();
  await getBalance();
}

test();
