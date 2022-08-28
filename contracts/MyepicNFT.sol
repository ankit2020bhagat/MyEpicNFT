// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract MyepicNFT is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    constructor() ERC721 ("SqareNFT","SQUARE"){
        console.log("This is nft contract !! Whoa");
    }

    function makeAnEpicNFT() public{
         uint newItemId = _tokenIds.current();

         _safeMint(msg.sender,newItemId);

         _setTokenURI(newItemId,"blah");

         _tokenIds.increment();

    } 
}
 