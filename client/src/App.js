import React, { useState } from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';

const web3 = new Web3('https://9545-fdf183c2-eac9-47d3-8b15-9c3a1043eb38.ws-us0.gitpod.io');

function App() {
  const [number, setNumber] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('ran');

    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    console.log(account);
    // let instance = await SimpleStorage.deployed()
  }

  console.log(web3);
  console.log(number)

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            Set Number:
            <input type="text" name="name" value={number} onChange={e => setNumber(e.target.value) }  />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
