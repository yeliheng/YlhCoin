let fs = require('fs');
let Web3 = require('web3');
let privateKey = Buffer.from("你的私钥","hex");
let Tx = require('ethereumjs-tx').Transaction;
//打开服务器
let provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/8a4622e55aa842d99e232dafdece2605");
let web3 = new Web3(provider);
//console.log(web3);

//读取ABI和BIN
ylhCoinABIObj = fs.readFileSync('ylhCoin_sol_MyCoin.abi');
ylhCoinABIJson = JSON.parse(ylhCoinABIObj.toString());
//console.log("ABI:" + ylhCoinABIObj.toString());
console.log("-------------------------");
ylhCoinBinObj = fs.readFileSync('ylhCoin_sol_MyCoin.bin');
ylhCoinByte = ylhCoinBinObj.toString();
//console.log("BIN:" + ylhCoinByte);
console.log("-------------------------");

//部署合约
account = {
address: "钱包地址",
privateKey: "你的私钥"
}
//console.log("当前账户: " + account);
contract = new web3.eth.Contract(ylhCoinABIJson);
//contract = new web3.eth.Contract(ylhCoinABIJson);//合约核心文件(ylhCoinABIJson)
//console.log(contract);

(async()=>{
let nowNonce = await web3.eth.getTransactionCount(account.address);
console.log("Nonce: " + nowNonce);
//构建交易(合约数据)
txData = {
	nonce: nowNonce,
	data:  "0x" + ylhCoinByte,
	from: account.address,
	gasPrice: '0x01',
	gasLimit: '0xfffff',
	value: web3.utils.toHex(web3.utils.toWei("1","ether")),
	to: '收款人的钱包地址'
}
//签发交易(使用私钥)
let tx = new Tx(txData,{
	chain: "ropsten",
	//hardfork: "petersburg"
});
tx.sign(Buffer.from(privateKey,"hex"));
let serializedTx = tx.serialize();
//sendSignedTransaction
//签发!
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt',console.log);
})();



