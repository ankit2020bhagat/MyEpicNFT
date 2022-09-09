import "./style/App.css";
import twitterlogo from "./assets/twitter-logo.svg"
//import './App.css';
import React from 'react';
import { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import contractAbi from './artifacts/contracts/MyepicNFT.sol/MyepicNFT.json';
import { ethers } from "ethers";

const TWITTER_HANDLER = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLER}`;
//const OPENSEA_LINK = '';
//const TOTAL_MINT_COUNT = 50;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const [account, setAccount] = useState(null);
  const [currentAccount,setcurrentAccount]=useState(null);
  async function requestAccount() {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if(accounts.length!==0){
      const account=accounts[0];
      setAccount(account);
      console.log("found Authorize Account",account);
    } else{
      console.log("No Authorize account found");
    }
   
  }

  const checkIfWalletIsConnect = () =>{
    const {ethereum} = window;

    if(!ethereum){
      console.log("Make sure you have metamask");
      return;
    }else{
      console.log("We have ethreum object",ethereum);
    }
  }
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );
   async function callmakeAnEpicNFT(){
    const provider=new ethers.providers.Web3Provider(window.ethereum);
    const signer=provider.getSigner();
    const EpicNFTContract=new ethers.Contract(contractAddress,contractAbi.abi,signer);
    const tranasction_callmakeAnEpicNFT=await EpicNFTContract.makeAnEpicNFT({from:account,gasLimit: 6721975,
			gasPrice: 20000000000, });
    await tranasction_callmakeAnEpicNFT.wait();
    console.log(tranasction_callmakeAnEpicNFT);
   }
  useEffect(()=>{
    checkIfWalletIsConnect();
  },[]);
  return (

    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
            </p>
         
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) :
          
            <button onClick={callmakeAnEpicNFT} className="cta-button connect-wallet-button">
              Mint NFT
            </button>
}


        </div>
       
        <Button onClick={requestAccount}>Connect_To_Metamask</Button>
        <p className="sub-text">
          Wallet Address: {account}
        </p>
        <div className="footer-container">
          <img alt="Twitter-Logo" className="twiiter-logo" src={twitterlogo} />
          <a className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"

          >{`build on @&{TWITTER_HANDLE}`}

          </a>
        </div>
      </div>


    </div>
  );
}

export default App;
