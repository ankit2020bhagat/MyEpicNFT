// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import {Base64} from "./library/Base64.sol";

contract MyepicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    string[] firstword = ["Fanastic", "Epic", "Terible"];

    string[] secondword = ["Cupcake", "Pizza", "Milkshake"];

    string[] thirdword = ["Naryto", "Sasuko", "Sskura"];

    function pickRandomFirstWord(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId)))
        );
        rand = rand % firstword.length;
        return firstword[rand];
    }

    function pickRandomSecondWord(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId)))
        );
        rand = rand % secondword.length;
        return secondword[rand];
    }

    function pickRandomThird(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("THIRD_WORD", Strings.toString(tokenId)))
        );
        rand = rand % thirdword.length;
        return thirdword[rand];
    }

    function random(string memory input) internal pure returns (uint) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    constructor() ERC721("SqareNFT", "SQUARE") {
        console.log("This is nft contract !! Whoa");
    }

    function makeAnEpicNFT() public {
        uint256 newItemId = _tokenIds.current();

        string memory first = pickRandomFirstWord(newItemId);

        string memory second = pickRandomSecondWord(newItemId);

        string memory third = pickRandomThird(newItemId);

        string memory combinedWord=string(abi.encodePacked(first,second,third));

        string memory finalSvg = string(
            abi.encodePacked(baseSvg, first, second, third, "</text></svg>")
        );
        
         string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                    // We set the title of our NFT as the generated word.
                    combinedWord,
                    '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                    // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                    Base64.encode(bytes(finalSvg)),
                    '"}'
                    )
                )
            )
         );

        string memory finaltokenUri=string(
            abi.encodePacked("data:application/json;base64",json)
        );

        console.log("\n................");
        console.log(string(abi.encodePacked("https://nftpreview.0xdev.codes/?code=",finaltokenUri)));

        console.log("\n..............");
        console.log(finalSvg);
        console.log("................");

        _safeMint(msg.sender, newItemId);

        _setTokenURI(
            newItemId,
            finaltokenUri
        );

        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        _tokenIds.increment();
    }
}
