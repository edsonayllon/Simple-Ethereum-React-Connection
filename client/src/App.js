import React, { useState } from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';

const web3 = new Web3('https://9545-fdf183c2-eac9-47d3-8b15-9c3a1043eb38.ws-us0.gitpod.io', null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('ran');

    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    //console.log(account);

    const contractAddress = '0x23B4E1c0dbD1E93B0d8e21c05fDb1FF1ADEDC3D1';

    const storageContract = web3.eth.Contract(abi,contractAddress);

    console.log(storageContract);
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
