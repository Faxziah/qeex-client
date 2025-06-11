// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract EverlastingContract {
    string private text;

    constructor(string memory _text) {
        text = _text;
    }

    function getText() public view returns (string memory) {
        return text;
    }
}