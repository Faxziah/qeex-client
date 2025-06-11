// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC721 } from 'lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol';

contract Nft is ERC721 {
    string private _baseTokenURI;

    constructor(string memory name_, string memory symbol_, string memory url) ERC721(name_, symbol_) {
        _baseTokenURI = url;
    }

    function tokenURI(uint256 /*tokenId*/) public view override returns (string memory) {
        return _baseTokenURI;
    }
}
