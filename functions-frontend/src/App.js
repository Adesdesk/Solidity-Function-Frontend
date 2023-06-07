import './App.css';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './WalletCard.css';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [currentTime, setCurrentTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    if (defaultAccount) {
      getCurrentTime();
      getCurrentDate();
    }
  }, [defaultAccount]);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
          getAccountBalance(result[0]);
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage(
        'Please install MetaMask browser extension to interact'
      );
    }
  };

  const accountChangedHandler = newAccount => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = account => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const getCurrentTime = () => {
    const contractAddress = '0xd027a3362e00238fF91b344ed028FCcf43850900';
    const contractABI = require('./ContractAbi.json');

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    contract
      .getCurrentTime()
      .then(result => {
        setCurrentTime(new Date(result * 1000).toLocaleTimeString());
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const getCurrentDate = () => {
    const contractAddress = '0xd027a3362e00238fF91b344ed028FCcf43850900';
    const contractABI = require('./ContractAbi.json');

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    contract
      .getCurrentDate()
      .then(result => {
        setCurrentDate(
          new Date(result * 86400 * 1000).toLocaleDateString()
        );
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid-use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  return (
    <div className='walletCard'>
      <div className='walletCardContent'>
      <h2>Connect Ethereum Wallet</h2> 
      <h4>This platform is built on the Polygon Munbai Network</h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className='accountDisplay'>
        <h3>User's Active Address: {defaultAccount}</h3>
      </div>
      <div className='balanceDisplay'>
        <h3>User's Current Balance: {userBalance}</h3>
      </div>
      <br></br>
      <h2>My two Additional Functions</h2>
      <div className='timeDisplay'>
        <h3>Time Now is: {currentTime}</h3>
      </div>
      <div className='dateDisplay'>
        <h3>Today's Date is: {currentDate}</h3>
      </div>
      <br></br>
      {errorMessage}
      </div>
    </div>
  );
};

export default App;
