require('dotenv').config();
require('@nomiclabs/hardhat-waffle');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: {
    version: '0.8.7',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
