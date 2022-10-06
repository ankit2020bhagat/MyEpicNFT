//const { ProgramError } = require("@project-serum/anchor");

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "env" });
/** @type import('hardhat/config').HardhatUserConfig */
const { QUICKNODE_API_KEY_URL, GOERLI_PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/GFg7TsPqZV0ZaIxRgWrGRJDEaEvkvyA0",
      accounts: ["5ca124f2f63b68cc3b6b017f307ac09a9f4432ab6625302fc0cc30d157f40e4f"]
    },
  },
};
