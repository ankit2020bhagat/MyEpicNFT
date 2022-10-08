import "./style/App.css";
import twitterlogo from "./assets/twitter-logo.svg"
//import './App.css';
import React from 'react';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import contractAbi from './artifacts/contracts/MyepicNFT.sol/MyEpicNFT.json'
import { ethers } from "ethers";

const TWITTER_HANDLER = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLER}`;

const TOTAL_MINT_COUNT = 50;
const contractAddress = "0x1eB775109FB9fEE7bC9e003371FCCF4b9B42b082";
let OPENSEA_LINK = '';

function App() {
  const [Count, setCount] = useState(0);
  const [account, setAccount] = useState(null);
  const [currentAccount, setcurrentAccount] = useState(null);
  async function requestAccount() {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      setAccount(account);
      console.log("found Authorize Account", account);
    } else {
      console.log("No Authorize account found");
    }

  }


  const checkIfWalletIsConnect = () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask");
      return;
    } else {
      console.log("We have ethreum object", ethereum);
    }
  }
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(contractAddress, contractAbi.abi, signer);

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function callmakeAnEpicNFT() {
    if (Count < TOTAL_MINT_COUNT) {
      try {
        let count=0;
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const EpicNFTContract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
          const tranasction_callmakeAnEpicNFT = await EpicNFTContract.makeEpicNFT();
          console.log("Going to pop wallet now ti pay to gas");

          console.log("Minig...please wait")
          await tranasction_callmakeAnEpicNFT.wait();
          console.log(`Mined see the transaction at  https://goerli.etherscan.io/tx/${tranasction_callmakeAnEpicNFT.hash}`)
          count += 1;
          setCount(count);
          OPENSEA_LINK = `https://testnets.opensea.io/assets/goerli/${contractAddress}/${Count}`
          console.log(OPENSEA_LINK);
        }

        else {
          console.log("Ethereum object doesn't exit");
        }
      }
      catch (error) {
        console.log(error);
      }
    }

  }
  useEffect(() => {
    checkIfWalletIsConnect();
    setupEventListener();

  }, []);
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
              Mint NFTEach
            </button>
          }



        </div>

        <Button onClick={requestAccount}>Connect_To_Metamask</Button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = OPENSEA_LINK;
          }}
        > Find your nft here</button>
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
