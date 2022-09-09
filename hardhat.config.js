//const { ProgramError } = require("@project-serum/anchor");

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "env" });
/** @type import('hardhat/config').HardhatUserConfig */
const { ALCHEMY_API_KEY, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/cv6DlK1tKoqoNNpbJzilbxdoK5FUPKgn",
      accounts: ['683178485355730281da2bb23d1ba833c1ca089171340164a838f931e9041b46'],
      
    },
  },
};
