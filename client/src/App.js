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
  const [getNumber, setGetNumber] = useState('0x00');

  const handleSet = async (e) => {
    e.preventDefault();
    const contractAddr = '0xDB20352830a438c0802dd14F987a55Ea8899A690';
    const SimpleContract = new web3.eth.Contract(abi, contractAddr);
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await SimpleContract.methods.set(number).estimateGas();
    const result = await SimpleContract.methods.set(number).send({ from: account, gas }, (err, result) => {
      console.log(err);
      console.log(result);
    });
  }

  const handleGet = async (e) => {
    e.preventDefault();
    const contractAddr = '0xDB20352830a438c0802dd14F987a55Ea8899A690';
    const SimpleContract = new web3.eth.Contract(abi, contractAddr);
    const result = await SimpleContract.methods.get.call();
    setGetNumber(result._hex);
    console.log(result);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input type="text" name="name" value={number} onChange={e => setNumber(e.target.value) }  />
          </label>
          <input type="submit" value="Set Number" />
        </form>
        <br/>
        <button onClick={handleGet} type="button">Get Number</button>
        { web3.utils.hexToNumber(getNumber) }
      </header>
    </div>
  );
}

export default App;
