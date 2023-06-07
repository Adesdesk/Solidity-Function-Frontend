import './App.css';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import './WalletCard.css';

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [currentTime, setCurrentTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [callerAddress, setCallerAddress] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
          getAccountBalance(result[0]);
          getCurrentTime();
          getCurrentDate();
          getCallerAddress();
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const getCurrentTime = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
      const contractABI = require('./ContractAbi.json');

      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      contract.getCurrentTime()
        .then((time) => {
          setCurrentTime(time.toString());
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  const getCurrentDate = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
      const contractABI = require('./ContractAbi.json');

      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      contract.getCurrentDate()
        .then((date) => {
          setCurrentDate(date.toString());
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  const getCallerAddress = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
      const contractABI = require('./ContractAbi.json');

      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      contract.getCallerAddress()
        .then((address) => {
          setCallerAddress(address);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on('accountsChanged', accountChangedHandler);
  window.ethereum.on('chainChanged', chainChangedHandler);

  return (
    <div className='walletCard'>
      <h4>Connect Metamask</h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className='accountDisplay'>
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className='balanceDisplay'>
        <h3>Balance: {userBalance}</h3>
      </div>
      <div>
        <h3>Current Time: {currentTime}</h3>
      </div>
      <div>
        <h3>Current Date: {currentDate}</h3>
      </div>
      <div>
        <h3>Caller Address: {callerAddress}</h3>
      </div>
      {errorMessage}
    </div>
  );
};

export default WalletCard;

