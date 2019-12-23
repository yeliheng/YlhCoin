pragma solidity ^0.5.14;
contract MyCoin{
	address public god;
	uint256 public total;
	mapping(address => uint256) public balances;
	
	constructor() public{
		god = msg.sender;
		total = 10000000;
		balances[god] = total;
	}
	//获取余额
	function getBal(address owner) public view returns(uint256){
		return balances[owner];
	}
	//转账
	function transaction(address payee,uint256 amount) public returns(bool){
		address owner = msg.sender;
		require(amount > 0);
		require(balances[owner] >= amount);
		balances[owner] -= amount;
		balances[payee] += amount;
		return true;
	}
}