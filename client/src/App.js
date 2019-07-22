import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';

const web3 = new Web3(Web3.givenProvider);

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "set",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "hello",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }
]

function App() {
  const [number, setNumber] = useState(0);
  const [Contract, setContract] = useState(new web3.eth.Contract(abi));

  const handleSet = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    Contract.options.address = account;
    const gas = await Contract.methods.set(number).estimateGas();
    const gasprice =web3.eth.defaultGasPrice
    const result = await Contract.methods.set(number).send({from: account, gas: gasprice}, (err, result) => {
      console.log(err);
      console.log(result);
    });
    console.log(result);
  }

  const handleGet = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    Contract.options.address = account;
    const gas = await Contract.methods.set(number).estimateGas();
    const result = await Contract.methods.get().call({from: account}, (error, result) => {
      console.log(error);
      console.log(result);
    });
  }

  const handleHello = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    Contract.options.address = account;
    const gas = await Contract.methods.hello().estimateGas();
    const result = await Contract.methods.hello;
    console.log(result);
  }

  useEffect(() => {
    Contract.address = '0xAd4FA117A42a7BCaee8E6617157d181e3a6f6Da4';
    console.log(Contract);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input type="text" name="name" value={number} onChange={e => setNumber(e.target.value) }  />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={handleHello} type="button">Get Hello</button>
      </header>
    </div>
  );
}

export default App;
