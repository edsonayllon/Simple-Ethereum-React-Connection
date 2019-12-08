import React, { useState } from 'react';
import Web3 from 'web3';
import { simpleStorageAbi } from './abi/abis'
import './App.css';

const web3 = new Web3(Web3.givenProvider);
const contractAddr = '0x97EaC1d4C5eA22dE6ba7292FA5d01a591Aac83A7';
const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);

function App() {
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState('0x00');

  const handleSet = async (e) => {
    e.preventDefault();
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
