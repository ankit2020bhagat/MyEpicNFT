const { ethers } = require("ethers");
const hre=require("hardhat");

const main = async() =>{
    const nftContractFactory=await hre.ethers.getContractFactory("MyepicNFT");
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract Address :",nftContract.address);
    const makeAnEpicNFT_tranasaction= await nftContract.makeAnEpicNFT();
    await makeAnEpicNFT_tranasaction.wait();
}

const runMain = async() =>{
    try {
        await main();
        process.exit(0);
    } catch(error){
        console.log(error);
        process.exit(1);
    }
};
 runMain();