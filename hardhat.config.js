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
      accounts: ["093da99a97487abdf1a45677fd60b8fe156fc3d4bf0e64a2648d032e60c57fc3"]
    },
  },
};
