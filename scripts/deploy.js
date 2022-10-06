const { ethers } = require("hardhat");

const main = async() =>{
   const nftContract  = await ethers.getContractFactory("MyEpicNFT");
   const deployContract  = await nftContract.deploy();
   await deployContract.deployed();
   console.log("Contract Address :",deployContract.address);

   // let txn_makeEpicNFT = await deployContract.makeEpicNFT();

   // await txn_makeEpicNFT.wait();
   // console.log("Minted NFT #1")

   //  txn_makeEpicNFT = await deployContract.makeEpicNFT();

   // await txn_makeEpicNFT.wait();
   // console.log("Minted NFT #2")


}

const runMain = async() =>{
   try{
    await main();
    process.exit(0);
   } catch(error){
    console.log(error)
    process.exit(1);
   }
};

runMain();