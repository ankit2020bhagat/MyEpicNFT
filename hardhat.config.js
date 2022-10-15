//const { ProgramError } = require("@project-serum/anchor");

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({ path: "env" });
/** @type import('hardhat/config').HardhatUserConfig */
const { QUICKNODE_API_KEY_URL, GOERLI_PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    
    
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "C69P9MZEMUHNW8U7KQFET5RNZ1J9FWU1R8",
  }
  
};
