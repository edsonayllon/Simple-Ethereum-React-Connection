import React, { useState } from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';

const web3 = new Web3(Web3.givenProvider, null);

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
  }
]

function App() {
  const [number, setNumber] = useState(0);

  const handleSet = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    console.log(account);
    const contractAddress = '0xC1eDa389e8cE8dABa5f7E1c4A8085ceBB323d61C';
    const storageContract = new web3.eth.Contract(abi, account, { address: contractAddress });
    const gas = await storageContract.methods.set(number).estimateGas();
    const result = await storageContract.methods.set(number).send({from: account, gas}, (err, result) => {
      console.log(err);
      console.log(result);
    });
    console.log(result);
  }

  const handleGet = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const contractAddress = '0xC1eDa389e8cE8dABa5f7E1c4A8085ceBB323d61C';
    const storageContract = new web3.eth.Contract(abi, account, { address: contractAddress });
    const gas = await storageContract.methods.set(number).estimateGas();
    const result = await storageContract.methods.get().call({from: account}, (error, result) => {
      console.log(error);
      console.log(result);
    });
  }

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
        <button onClick={handleGet} type="button">Get</button>
      </header>
    </div>
  );
}

export default App;
