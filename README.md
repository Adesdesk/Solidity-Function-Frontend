# Solidity-Function-Frontend

This program serves as a simple and straightforward implementation of smart contract management via a frontend application.

## Description

This program is a simple contract written in Solidity, a programming language used for developing smart contracts on the Ethereum blockchain. The contract has 2 functions which values are shown in a React.js frontend application. 

## Getting Started

### Executing program

* To run this program, simply launch the live deployment url on the side widget of this repository. 
* To run it locally, clone this repository to your local computer and open a split (two segments) terminal.
* In one terminal, navigate (cd) into the folder functions-contract and run npm install
* Open the folder in a code editor like VSCode
* Create a .env file in the root functions-contract directory and store your API url, Metamask wallet private key etc. as illustrated below;

```
API_URL = "Replace with your actual API url" 
PRIVATE_KEY = "Replace with your actual Metamask private key" 
POLYGONSCAN_KEY = "Replace with your Polygonscan API key" 
```
* Run "npx hardhat run scripts/deploy.js --network mumbai" to compile and deploy the smart contract and look out for the contract address output to the console
* Copy this address and paste it as a replacement everywhere contract address appears in App.js file of the "functions-frontend" folder
* Remember to save all changes made to code files
* In the second terminal, navigate (cd) into the functions-frontend folder and run npm install
* Once done, the terminal still pointing to that functions-frontend folder, run npm start
* This will initiate an auto-launch of the frontend React app in your device's default browser
* View the rendered interface to see the values of both functions of the smart contract on the frontend.


## Author(s)

Name: Adeola David Adelakun

Email: adesdesk@outlook.com


## License

This project is licensed under the MIT License - see the LICENSE.md file for details
